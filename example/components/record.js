import React, { Component } from 'react'
import JIMU from './index'

const {CarRecord,Travel} = JIMU
// 用车纪录 carRecord
let filedMap =
  {
    "pay_type":["企业支付","个人垫付","混合支付"],
    "use_car_type":{"1":"出租车","2":"专车","3":"快车","4":"代驾"},
    "use_car_srv":{"101":"出租车单次用车","201":"专车单次用车"},
    "require_level":{"100":"舒适型","200":"豪华型","400":"商务型","600":"普通型"}
  }
const _CarRecord = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 104}px`}}>
      <h2 className="page-title"><b>CarRecord</b><span>用车纪录</span></h2>
      <div className="demo-show">
        <dl className="dl-list">
          <dt>用车纪录</dt>
          <dd>
            <CarRecord
            filedMap={filedMap}
            weekFormat="zh"
            drsFontLen={15}
            nameSubstrLen={3}
            weekShow={false}
            dateFormat="MM月dd日 hh:ss"
            superAdmin={0}
            start_name="北京首都国际机场T2航站楼1"
            end_name="当代城市家园-东门"
            create_time={1430291523}
            use_car_type={3}
            require_level={100}
            pay_type={0}
            real_pay={15.66}
            tip_fee={10}
            other_fee={30}
            realname="牛德华"
            className="jimu-app-v2"
            href = "javascript:;"
          />
          </dd><dd>
          <CarRecord
            filedMap={filedMap}
            weekFormat="zh"
            drsFontLen={15}
            nameSubstrLen={3}
            weekShow={false}
            dateFormat="MM月dd日 hh:ss"
            superAdmin={1}
            start_name="北京首都国际机场T2航站楼"
            end_name="当代城市家园-东门"
            create_time={1430291523}
            use_car_type={3}
            require_level={100}
            pay_type={0}
            real_pay={15.66}
            tip_fee={10}
            other_fee={30}
            realname="牛德华"
            className="jimu-app-v2"
            href = "javascript:;"
          />
          </dd>
        </dl>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>

)
module.exports = _CarRecord
