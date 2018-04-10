import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../input';

const propTypes = {
  inputsAlign: PropTypes.string,
  asideType: PropTypes.string,
  asideVal: PropTypes.string,
  asideName: PropTypes.string,
  asideId: PropTypes.string,
  mainValue: PropTypes.string,
  mainClassName: PropTypes.string,
  mainFocusClass: PropTypes.string,
  mainBlurClass: PropTypes.string,
  mainMaxlength: PropTypes.number,
};

const defaultProps = {
  inputsAlign: '', // 设置侧边单选框、复选框位置 （left、right）
  asideType: '', // 设置侧边input类型 （checkbox、radio）
  asideVal: '', // 侧边input value值
  asideName: '', // 侧边input name值
  asideId: '', // 侧边input id 名称
  mainValue: '', // input输入框 默认值
  mainClassName: '', // input输入框  class名称
  mainFocusClass: 'focus', // input输入框 focus class名称
  mainBlurClass: 'blur', // input输入框 blur class名称
  mainMaxlength: 99999, // input输入框 最大输入字符
};

const Inputs = (props) => {
  const {
    className, inputsAlign, asideType, asideVal, asideName, asideId, mainValue,
    mainClassName, mainFocusClass, mainBlurClass, mainMaxlength, mainName, mainId, ...others
  } = props;
  const aligncls = inputsAlign === 'left' ? 'align-lf' : 'align-rt';
  const cls = classNames({
    'name-all': true,
    'jimu-inputs': true,
    [aligncls]: aligncls,
    [className]: className,
  });

  const clsinput = classNames({
    'main-input': (asideType !== ''),
    'main-input-base': (asideType === ''),
  });

  return (
    <div className={cls}>
      {inputsAlign === 'left' && (
        <span className="aside-input"><Input
          id={asideId}
          type={asideType}
          value={asideVal}
          name={asideName}
        />
        </span>
      )}

      <div className={clsinput}>
        <Input
          id={mainId}
          name={mainName}
          defaultValue={mainValue}
          className={mainClassName}
          maxLength={mainMaxlength}
          focusClass={mainFocusClass}
          blurClass={mainBlurClass}
          {...others}
        />
      </div>
      {inputsAlign === 'right' && (
        <span className="aside-input"><Input
          id={asideId}
          type={asideType}
          value={asideVal}
          name={asideName}
        />
        </span>
      )}
    </div>
  );
};

Inputs.propTypes = propTypes;
Inputs.defaultProps = defaultProps;

export default Inputs;
