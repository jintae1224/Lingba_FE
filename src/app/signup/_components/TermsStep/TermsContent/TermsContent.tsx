import classNames from "classnames/bind";

import styles from "../TermsStep.module.css";

const cx = classNames.bind(styles);

export default function TermsContent() {
  return (
    <div className={cx("terms-content")}>
      <div className={cx("section")}>
        <h5>제1조 (목적)</h5>
        <p>
          이 약관은 Lingba(이하 &ldquo;회사&rdquo;)가 제공하는 서비스의 이용조건
          및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      </div>

      <div className={cx("section")}>
        <h5>제2조 (정의)</h5>
        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ul>
          <li>서비스: 회사가 제공하는 모든 서비스를 의미합니다.</li>
          <li>회원: 서비스에 가입하여 이용하는 자를 의미합니다.</li>
        </ul>
      </div>

      <div className={cx("section")}>
        <h5>제3조 (개인정보 처리)</h5>
        <p>
          회사는 개인정보보호법에 따라 이용자의 개인정보를 보호하며, 관련 법령을
          준수합니다.
        </p>
      </div>

      <div className={cx("section")}>
        <h5>제4조 (서비스의 제공 및 변경)</h5>
        <p>회사는 다음과 같은 업무를 수행합니다.</p>
        <ul>
          <li>언어 학습 서비스 제공</li>
          <li>회원 관리 업무</li>
          <li>기타 회사가 정하는 업무</li>
        </ul>
      </div>

      <div className={cx("section")}>
        <h5>제5조 (회원가입)</h5>
        <p>
          회원가입은 신청자가 온라인으로 회사에서 제공하는 소정의 가입신청
          양식에서 요구하는 사항을 기록하여 가입을 완료하는 것으로 성립됩니다.
        </p>
      </div>

      <div className={cx("section")}>
        <h5>제6조 (개인정보보호)</h5>
        <p>
          회사는 관계법령이 정하는 바에 따라 회원 등록정보를 포함한 회원의
          개인정보를 보호하기 위해 노력합니다. 회원의 개인정보보호에 관해서는
          관련법령 및 회사의 개인정보보호정책이 적용됩니다.
        </p>
      </div>
    </div>
  );
}
