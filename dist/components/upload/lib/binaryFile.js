'use strict';

/**
   * @param {(Array|string)} val
   * @param {number} iDataOffset
   * @param {(Document|string)} iDataLength
   * @return {undefined}
   */
window.BinaryFile = function (val, iDataOffset, iDataLength) {
  /** @type {(Array|string)} */
  var data = val;
  var dataOffset = iDataOffset || 0;
  /** @type {number} */
  var dataLength = 0;
  /**
   * @return {?}
   */
  this.getRawData = function () {
    return data;
  };
  if (typeof val === 'string') {
    dataLength = iDataLength || data.length;
    /**
     * @param {number} recurring
     * @return {?}
     */
    this.getByteAt = function (recurring) {
      return 255 & data.charCodeAt(recurring + dataOffset);
    };
    /**
     * @param {number} iOffset
     * @param {number} iLength
     * @return {?}
     */
    this.getBytesAt = function (iOffset, iLength) {
      /** @type {Array} */
      var prevSources = [];
      /** @type {number} */
      var i = 0;
      for (; iLength > i; i++) {
        /** @type {number} */
        prevSources[i] = 255 & data.charCodeAt(iOffset + i + dataOffset);
      }
      return prevSources;
    };
  } else {
    /* eslint-disable valid-typeof, no-undef */
    if (typeof val === 'unknown') {
      dataLength = iDataLength || IEBinary_getLength(data);
      /**
       * @param {number} recurring
       * @return {?}
       */
      this.getByteAt = function (recurring) {
        return IEBinary_getByteAt(data, recurring + dataOffset);
      };
      /**
       * @param {number} iOffset
       * @param {number} iLength
       * @return {?}
       */
      this.getBytesAt = function (iOffset, iLength) {
        return new VBArray(IEBinary_getBytesAt(data, iOffset + dataOffset, iLength)).toArray();
      };
    }
    /* eslint-enable valid-typeof, no-undef */
  }
  /**
   * @return {?}
   */
  this.getLength = function () {
    return dataLength;
  };
  /**
   * @param {number} recurring
   * @return {?}
   */
  this.getSByteAt = function (recurring) {
    var h = this.getByteAt(recurring);
    return h > 127 ? h - 256 : h;
  };
  /**
   * @param {number} recurring
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  this.getShortAt = function (recurring, deepDataAndEvents) {
    var n = deepDataAndEvents ? (this.getByteAt(recurring) << 8) + this.getByteAt(recurring + 1) : (this.getByteAt(recurring + 1) << 8) + this.getByteAt(recurring);
    n < 0 && (n += 65536);
    return n;
  };
  /**
   * @param {number} iOffset
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  this.getSShortAt = function (iOffset, deepDataAndEvents) {
    var iUShort = this.getShortAt(iOffset, deepDataAndEvents);
    return iUShort > 32767 ? iUShort - 65536 : iUShort;
  };
  /**
   * @param {number} recurring
   * @param {?} bigEnd
   * @return {?}
   */
  this.getLongAt = function (recurring, bigEnd) {
    var iByte4 = this.getByteAt(recurring);
    var iByte3 = this.getByteAt(recurring + 1);
    var iByte2 = this.getByteAt(recurring + 2);
    var iByte1 = this.getByteAt(recurring + 3);
    var a = bigEnd ? (((iByte4 << 8) + iByte3 << 8) + iByte2 << 8) + iByte1 : (((iByte1 << 8) + iByte2 << 8) + iByte3 << 8) + iByte4;
    a < 0 && (a += 4294967296);
    return a;
  };
  /**
   * @param {?} recurring
   * @param {?} bigEnd
   * @return {?}
   */
  this.getSLongAt = function (recurring, bigEnd) {
    var h = this.getLongAt(recurring, bigEnd);
    return h > 2147483647 ? h - 4294967296 : h;
  };
  /**
   * @param {number} iOffset
   * @param {number} iLength
   * @return {?}
   */
  this.getStringAt = function (iOffset, iLength) {
    /** @type {Array} */
    var tmpArr = [];
    var aBytes = this.getBytesAt(iOffset, iLength);
    /** @type {number} */
    var i = 0;
    for (; iLength > i; i++) {
      /** @type {string} */
      tmpArr[i] = String.fromCharCode(aBytes[i]);
    }
    return tmpArr.join('');
  };
  /**
   * @param {number} recurring
   * @return {?}
   */
  this.getCharAt = function (recurring) {
    return String.fromCharCode(this.getByteAt(recurring));
  };
  /**
   * @return {?}
   */
  this.toBase64 = function () {
    return window.btoa(data);
  };
  /**
   * @param {?} strBase64
   * @return {undefined}
   */
  this.fromBase64 = function (strBase64) {
    data = window.atob(strBase64);
  };
};