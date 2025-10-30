import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="text-left py-16 mb-16 rounded-lg">
      <h1
        className="text-5xl font-bold mb-6"
        style={{
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: "1.1",
        }}
      >
        개발과 일상을
        <br />
        기록하는 공간
      </h1>
      <p
        className="text-lg mb-8 text-left leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        코드를 통해 배운 것들과 삶에서 경험한 소중한 순간들을 나누는
        블로그입니다.
      </p>
    </section>
  );
};

export default React.memo(HeroSection);
