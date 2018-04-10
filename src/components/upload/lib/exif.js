/* global BinaryAjax */
window.EXIF = (function () {
  /**
     * @param {Element} img
     * @return {?}
     */
  function imageHasData(img) {
    return !!img.exifdata;
  }
  /**
     * @param {Element} img
     * @param {Function} callback
     * @return {undefined}
     */
  function getImageData(img, callback) {
    BinaryAjax(img.src, (oHTTP) => {
      const data = findEXIFinJPEG(oHTTP.binaryResponse);
      img.exifdata = data || {};
      if (callback) {
        callback.call(img);
      }
    });
  }
  /**
     * @param {?} file
     * @return {?}
     */
  function findEXIFinJPEG(file) {
    if (file.getByteAt(0) !== 255 || file.getByteAt(1) !== 216) {
      return false;
    }
    let t;
    /** @type {number} */
    let offset = 2;
    const distanceX = file.getLength();
    for (;distanceX > offset;) {
      if (file.getByteAt(offset) !== 255) {
        c && console.log(`Not a valid marker at offset ${offset}, found: ${file.getByteAt(offset)}`);
        return false;
      }
      t = file.getByteAt(offset + 1);
      if (t === 22400) {
        c && console.log('Found 0xFFE1 marker');
        return readEXIFData(file, offset + 4, file.getShortAt(offset + 2, true) - 2);
      }
      if (t === 225) {
        c && console.log('Found 0xFFE1 marker');
        return readEXIFData(file, offset + 4, file.getShortAt(offset + 2, true) - 2);
      }
      offset += 2 + file.getShortAt(offset + 2, true);
    }
  }
  /**
     * @param {?} file
     * @param {?} tiffStart
     * @param {number} dirStart
     * @param {?} strings
     * @param {string} bigEnd
     * @return {?}
     */
  function readTags(file, tiffStart, dirStart, strings, bigEnd) {
    let entryOffset;
    let tag;
    let high;
    const val = file.getShortAt(dirStart, bigEnd);
    const tags = {};
    /** @type {number} */
    high = 0;
    for (;val > high; high++) {
      entryOffset = dirStart + 12 * high + 2;
      tag = strings[file.getShortAt(entryOffset, bigEnd)];
      if (!tag) {
        if (c) {
          console.log(`Unknown tag: ${file.getShortAt(entryOffset, bigEnd)}`);
        }
      }
      tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
    }
    return tags;
  }
  /**
     * @param {?} file
     * @param {number} entryOffset
     * @param {?} tiffStart
     * @param {number} dirStart
     * @param {undefined} bigEnd
     * @return {?}
     */
  function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
    let offset;
    let vals;
    let val;
    let n;
    let numerator;
    let denominator;
    const type = file.getShortAt(entryOffset + 2, bigEnd);
    const numValues = file.getLongAt(entryOffset + 4, bigEnd);
    const valueOffset = file.getLongAt(entryOffset + 8, bigEnd) + tiffStart;
    switch (type) {
      case 1:
      case 7:
        if (numValues === 1) {
          return file.getByteAt(entryOffset + 8, bigEnd);
        }
        offset = numValues > 4 ? valueOffset : entryOffset + 8;
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          vals[n] = file.getByteAt(offset + n);
        }
        return vals;
      case 2:
        offset = numValues > 4 ? valueOffset : entryOffset + 8;
        return file.getStringAt(offset, numValues - 1);
      case 3:
        if (numValues === 1) {
          return file.getShortAt(entryOffset + 8, bigEnd);
        }
        offset = numValues > 2 ? valueOffset : entryOffset + 8;
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          vals[n] = file.getShortAt(offset + 2 * n, bigEnd);
        }
        return vals;
      case 4:
        if (numValues === 1) {
          return file.getLongAt(entryOffset + 8, bigEnd);
        }
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          vals[n] = file.getLongAt(valueOffset + 4 * n, bigEnd);
        }
        return vals;
      case 5:
        if (numValues === 1) {
          numerator = file.getLongAt(valueOffset, bigEnd);
          denominator = file.getLongAt(valueOffset + 4, bigEnd);
          /* eslint-disable no-new-wrappers */
          val = new Number(numerator / denominator);
          /* eslint-enable no-new-wrappers */
          val.numerator = numerator;
          val.denominator = denominator;
          return val;
        }
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          numerator = file.getLongAt(valueOffset + 8 * n, bigEnd);
          denominator = file.getLongAt(valueOffset + 4 + 8 * n, bigEnd);
          /* eslint-disable no-new-wrappers */
          vals[n] = new Number(numerator / denominator);
          /* eslint-enable no-new-wrappers */
          vals[n].numerator = numerator;
          vals[n].denominator = denominator;
        }
        return vals;
      case 9:
        if (numValues === 1) {
          return file.getSLongAt(entryOffset + 8, bigEnd);
        }
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          vals[n] = file.getSLongAt(valueOffset + 4 * n, bigEnd);
        }
        return vals;
      case 10:
        if (numValues === 1) {
          return file.getSLongAt(valueOffset, bigEnd) / file.getSLongAt(valueOffset + 4, bigEnd);
        }
        /** @type {Array} */
        vals = [];
        /** @type {number} */
        n = 0;
        for (;numValues > n; n++) {
          /** @type {number} */
          vals[n] = file.getSLongAt(valueOffset + 8 * n, bigEnd) / file.getSLongAt(valueOffset + 4 + 8 * n, bigEnd);
        }
        return vals;
    }
  }
  /**
     * @param {?} file
     * @param {number} start
     * @return {?}
     */
  function readEXIFData(file, start) {
    if (file.getStringAt(start, 4) !== 'Exif') {
      c && console.log(`Not valid EXIF data! ${file.getStringAt(start, 4)}`);
      return false;
    }
    let bigEnd;
    let tags;
    let tag;
    let exifData;
    let gpsData;
    const tiffOffset = start + 6;
    if (file.getShortAt(tiffOffset) === 18761) {
      /** @type {boolean} */
      bigEnd = false;
    } else {
      if (file.getShortAt(tiffOffset) !== 19789) {
        c && console.log('Not valid TIFF data! (no 0x4949 or 0x4D4D)');
        return false;
      }
      /** @type {boolean} */
      bigEnd = true;
    }
    if (file.getShortAt(tiffOffset + 2, bigEnd) !== 42) {
      c && console.log('Not valid TIFF data! (no 0x002A)');
      return false;
    }
    if (file.getLongAt(tiffOffset + 4, bigEnd) !== 8) {
      c && console.log('Not valid TIFF data! (First offset not 8)', file.getShortAt(tiffOffset + 4, bigEnd));
      return false;
    }
    tags = readTags(file, tiffOffset, tiffOffset + 8, TiffTags, bigEnd);
    if (tags.ExifIFDPointer) {
      exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
      for (tag in exifData) {
        switch (tag) {
          case 'LightSource':
          case 'Flash':
          case 'MeteringMode':
          case 'ExposureProgram':
          case 'SensingMethod':
          case 'SceneCaptureType':
          case 'SceneType':
          case 'CustomRendered':
          case 'WhiteBalance':
          case 'GainControl':
          case 'Contrast':
          case 'Saturation':
          case 'Sharpness':
          case 'SubjectDistanceRange':
          case 'FileSource':
            exifData[tag] = StringValues[tag][exifData[tag]];
            break;
          case 'ExifVersion':
          case 'FlashpixVersion':
            /** @type {string} */
            exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
            break;
          case 'ComponentsConfiguration':
            exifData[tag] = StringValues.Components[exifData[tag][0]] + StringValues.Components[exifData[tag][1]] + StringValues.Components[exifData[tag][2]] + StringValues.Components[exifData[tag][3]];
        }
        tags[tag] = exifData[tag];
      }
    }
    if (tags.GPSInfoIFDPointer) {
      gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
      for (tag in gpsData) {
        switch (tag) {
          case 'GPSVersionID':
            gpsData[tag] = `${gpsData[tag][0]}.${gpsData[tag][1]}.${gpsData[tag][2]}.${gpsData[tag][3]}`;
        }
        tags[tag] = gpsData[tag];
      }
    }
    return tags;
  }
  /**
     * @param {Element} img
     * @param {Function} callback
     * @return {?}
     */
  function getData(img, callback) {
    return img.complete ? (imageHasData(img) ? callback && callback.call(img) : getImageData(img, callback), true) : false;
  }
  /**
     * @param {Element} img
     * @param {?} tag
     * @return {?}
     */
  function getTag(img, tag) {
    return imageHasData(img) ? img.exifdata[tag] : void 0;
  }
  /**
     * @param {Element} img
     * @return {?}
     */
  function getAllTags(img) {
    if (!imageHasData(img)) {
      return {};
    }
    let prop;
    const data = img.exifdata;
    const cache = {};
    for (prop in data) {
      if (data.hasOwnProperty(prop)) {
        cache[prop] = data[prop];
      }
    }
    return cache;
  }
  /**
     * @param {Element} img
     * @return {?}
     */
  function pretty(img) {
    if (!imageHasData(img)) {
      return '';
    }
    let a;
    const data = img.exifdata;
    /** @type {string} */
    let optsData = '';
    for (a in data) {
      if (data.hasOwnProperty(a)) {
        optsData += typeof data[a] === 'object' ? data[a] instanceof Number ? `${a} : ${data[a]} [${data[a].numerator}/${data[a].denominator}]\r\n` : `${a} : [${data[a].length} values]\r\n` : `${a} : ${data[a]}\r\n`;
      }
    }
    return optsData;
  }
  /**
     * @param {?} file
     * @return {?}
     */
  function readFromBinaryFile(file) {
    return findEXIFinJPEG(file);
  }
  /** @type {boolean} */
  var c = false;
  var ExifTags = {
    36864: 'ExifVersion',
    40960: 'FlashpixVersion',
    40961: 'ColorSpace',
    40962: 'PixelXDimension',
    40963: 'PixelYDimension',
    37121: 'ComponentsConfiguration',
    37122: 'CompressedBitsPerPixel',
    37500: 'MakerNote',
    37510: 'UserComment',
    40964: 'RelatedSoundFile',
    36867: 'DateTimeOriginal',
    36868: 'DateTimeDigitized',
    37520: 'SubsecTime',
    37521: 'SubsecTimeOriginal',
    37522: 'SubsecTimeDigitized',
    33434: 'ExposureTime',
    33437: 'FNumber',
    34850: 'ExposureProgram',
    34852: 'SpectralSensitivity',
    34855: 'ISOSpeedRatings',
    34856: 'OECF',
    37377: 'ShutterSpeedValue',
    37378: 'ApertureValue',
    37379: 'BrightnessValue',
    37380: 'ExposureBias',
    37381: 'MaxApertureValue',
    37382: 'SubjectDistance',
    37383: 'MeteringMode',
    37384: 'LightSource',
    37385: 'Flash',
    37396: 'SubjectArea',
    37386: 'FocalLength',
    41483: 'FlashEnergy',
    41484: 'SpatialFrequencyResponse',
    41486: 'FocalPlaneXResolution',
    41487: 'FocalPlaneYResolution',
    41488: 'FocalPlaneResolutionUnit',
    41492: 'SubjectLocation',
    41493: 'ExposureIndex',
    41495: 'SensingMethod',
    41728: 'FileSource',
    41729: 'SceneType',
    41730: 'CFAPattern',
    41985: 'CustomRendered',
    41986: 'ExposureMode',
    41987: 'WhiteBalance',
    41988: 'DigitalZoomRation',
    41989: 'FocalLengthIn35mmFilm',
    41990: 'SceneCaptureType',
    41991: 'GainControl',
    41992: 'Contrast',
    41993: 'Saturation',
    41994: 'Sharpness',
    41995: 'DeviceSettingDescription',
    41996: 'SubjectDistanceRange',
    40965: 'InteroperabilityIFDPointer',
    42016: 'ImageUniqueID',
  };
  var TiffTags = {
    256: 'ImageWidth',
    257: 'ImageHeight',
    34665: 'ExifIFDPointer',
    34853: 'GPSInfoIFDPointer',
    40965: 'InteroperabilityIFDPointer',
    258: 'BitsPerSample',
    259: 'Compression',
    262: 'PhotometricInterpretation',
    274: 'Orientation',
    277: 'SamplesPerPixel',
    284: 'PlanarConfiguration',
    530: 'YCbCrSubSampling',
    531: 'YCbCrPositioning',
    282: 'XResolution',
    283: 'YResolution',
    296: 'ResolutionUnit',
    273: 'StripOffsets',
    278: 'RowsPerStrip',
    279: 'StripByteCounts',
    513: 'JPEGInterchangeFormat',
    514: 'JPEGInterchangeFormatLength',
    301: 'TransferFunction',
    318: 'WhitePoint',
    319: 'PrimaryChromaticities',
    529: 'YCbCrCoefficients',
    532: 'ReferenceBlackWhite',
    306: 'DateTime',
    270: 'ImageDescription',
    271: 'Make',
    272: 'Model',
    305: 'Software',
    315: 'Artist',
    33432: 'Copyright',
  };
  var GPSTags = {
    0: 'GPSVersionID',
    1: 'GPSLatitudeRef',
    2: 'GPSLatitude',
    3: 'GPSLongitudeRef',
    4: 'GPSLongitude',
    5: 'GPSAltitudeRef',
    6: 'GPSAltitude',
    7: 'GPSTimeStamp',
    8: 'GPSSatellites',
    9: 'GPSStatus',
    10: 'GPSMeasureMode',
    11: 'GPSDOP',
    12: 'GPSSpeedRef',
    13: 'GPSSpeed',
    14: 'GPSTrackRef',
    15: 'GPSTrack',
    16: 'GPSImgDirectionRef',
    17: 'GPSImgDirection',
    18: 'GPSMapDatum',
    19: 'GPSDestLatitudeRef',
    20: 'GPSDestLatitude',
    21: 'GPSDestLongitudeRef',
    22: 'GPSDestLongitude',
    23: 'GPSDestBearingRef',
    24: 'GPSDestBearing',
    25: 'GPSDestDistanceRef',
    26: 'GPSDestDistance',
    27: 'GPSProcessingMethod',
    28: 'GPSAreaInformation',
    29: 'GPSDateStamp',
    30: 'GPSDifferential',
  };
  var StringValues = {
    ExposureProgram: {
      0: 'Not defined',
      1: 'Manual',
      2: 'Normal program',
      3: 'Aperture priority',
      4: 'Shutter priority',
      5: 'Creative program',
      6: 'Action program',
      7: 'Portrait mode',
      8: 'Landscape mode',
    },
    MeteringMode: {
      0: 'Unknown',
      1: 'Average',
      2: 'CenterWeightedAverage',
      3: 'Spot',
      4: 'MultiSpot',
      5: 'Pattern',
      6: 'Partial',
      255: 'Other',
    },
    LightSource: {
      0: 'Unknown',
      1: 'Daylight',
      2: 'Fluorescent',
      3: 'Tungsten (incandescent light)',
      4: 'Flash',
      9: 'Fine weather',
      10: 'Cloudy weather',
      11: 'Shade',
      12: 'Daylight fluorescent (D 5700 - 7100K)',
      13: 'Day white fluorescent (N 4600 - 5400K)',
      14: 'Cool white fluorescent (W 3900 - 4500K)',
      15: 'White fluorescent (WW 3200 - 3700K)',
      17: 'Standard light A',
      18: 'Standard light B',
      19: 'Standard light C',
      20: 'D55',
      21: 'D65',
      22: 'D75',
      23: 'D50',
      24: 'ISO studio tungsten',
      255: 'Other',
    },
    Flash: {
      0: 'Flash did not fire',
      1: 'Flash fired',
      5: 'Strobe return light not detected',
      7: 'Strobe return light detected',
      9: 'Flash fired, compulsory flash mode',
      13: 'Flash fired, compulsory flash mode, return light not detected',
      15: 'Flash fired, compulsory flash mode, return light detected',
      16: 'Flash did not fire, compulsory flash mode',
      24: 'Flash did not fire, auto mode',
      25: 'Flash fired, auto mode',
      29: 'Flash fired, auto mode, return light not detected',
      31: 'Flash fired, auto mode, return light detected',
      32: 'No flash function',
      65: 'Flash fired, red-eye reduction mode',
      69: 'Flash fired, red-eye reduction mode, return light not detected',
      71: 'Flash fired, red-eye reduction mode, return light detected',
      73: 'Flash fired, compulsory flash mode, red-eye reduction mode',
      77: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
      79: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
      89: 'Flash fired, auto mode, red-eye reduction mode',
      93: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
      95: 'Flash fired, auto mode, return light detected, red-eye reduction mode',
    },
    SensingMethod: {
      1: 'Not defined',
      2: 'One-chip color area sensor',
      3: 'Two-chip color area sensor',
      4: 'Three-chip color area sensor',
      5: 'Color sequential area sensor',
      7: 'Trilinear sensor',
      8: 'Color sequential linear sensor',
    },
    SceneCaptureType: {
      0: 'Standard',
      1: 'Landscape',
      2: 'Portrait',
      3: 'Night scene',
    },
    SceneType: {
      1: 'Directly photographed',
    },
    CustomRendered: {
      0: 'Normal process',
      1: 'Custom process',
    },
    WhiteBalance: {
      0: 'Auto white balance',
      1: 'Manual white balance',
    },
    GainControl: {
      0: 'None',
      1: 'Low gain up',
      2: 'High gain up',
      3: 'Low gain down',
      4: 'High gain down',
    },
    Contrast: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard',
    },
    Saturation: {
      0: 'Normal',
      1: 'Low saturation',
      2: 'High saturation',
    },
    Sharpness: {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard',
    },
    SubjectDistanceRange: {
      0: 'Unknown',
      1: 'Macro',
      2: 'Close view',
      3: 'Distant view',
    },
    FileSource: {
      3: 'DSC',
    },
    Components: {
      0: '',
      1: 'Y',
      2: 'Cb',
      3: 'Cr',
      4: 'R',
      5: 'G',
      6: 'B',
    },
  };
  return {
    /** @type {function (?): ?} */
    readFromBinaryFile,
    /** @type {function (Element): ?} */
    pretty,
    /** @type {function (Element, ?): ?} */
    getTag,
    /** @type {function (Element): ?} */
    getAllTags,
    /** @type {function (Element, Function): ?} */
    getData,
    Tags: ExifTags,
    TiffTags,
    GPSTags,
    StringValues,
  };
}());
