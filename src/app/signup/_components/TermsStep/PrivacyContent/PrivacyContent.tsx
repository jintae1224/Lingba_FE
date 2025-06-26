import classNames from "classnames/bind";

import styles from "../TermsStep.module.css";

const cx = classNames.bind(styles);

export default function PrivacyContent() {
  return (
    <div className={cx("terms-content")}>
      <div className={cx("section")}>
        <h5>제1조 (개인정보의 처리목적)</h5>
        <p>
          Lingba(이하 &ldquo;회사&rdquo;)는 다음의 목적을 위하여 개인정보를
          처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
        </p>
        <ul>
          <li>
            회원 가입 의사의 확인, 회원제 서비스 제공에 따른 본인 식별·인증
          </li>
          <li>서비스 제공 및 콘텐츠 제공</li>
          <li>고객 상담 및 불만처리</li>
        </ul>
      </div>

      <div className={cx("section")}>
        <h5>제2조 (개인정보의 처리 및 보유기간)</h5>
        <p>
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </p>
      </div>

      <div className={cx("section")}>
        <h5>제3조 (개인정보의 제3자 제공)</h5>
        <p>
          회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한
          범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
          개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
          제3자에게 제공합니다.
        </p>
      </div>

      <div className={cx("section")}>
        <h5>제4조 (개인정보 처리의 위탁)</h5>
        <p>
          회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
          처리업무를 위탁하고 있습니다.
        </p>
        <ul>
          <li>AWS: 클라우드 서비스 제공</li>
          <li>Google: 로그인 서비스 제공</li>
        </ul>
      </div>

      <div className={cx("section")}>
        <h5>제5조 (정보주체의 권리·의무 및 행사방법)</h5>
        <p>
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
          행사할 수 있습니다.
        </p>
        <ul>
          <li>개인정보 처리정지 요구</li>
          <li>개인정보 열람요구</li>
          <li>개인정보 정정·삭제 요구</li>
        </ul>
      </div>
    </div>
  );
}
