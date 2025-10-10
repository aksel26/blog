import React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

interface AboutPageData {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const AboutPage: React.FC<PageProps<AboutPageData>> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="About"
        description="블로그 운영자에 대한 소개페이지입니다."
        pathname="/about"
      />
      
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            개발과 일상을 기록하는 블로거입니다
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              👋 안녕하세요!
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                프론트엔드 개발에 관심이 많은 개발자입니다. 
                React, TypeScript, Next.js 등의 기술을 주로 사용하며, 
                새로운 기술을 학습하고 적용하는 것을 좋아합니다.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                이 블로그에서는 개발 과정에서 얻은 지식과 경험, 
                그리고 일상에서 느낀 소소한 이야기들을 공유하고 있습니다.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              🛠️ 주요 기술 스택
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-200">
                  Frontend
                </h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                  <li>• React / Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Gatsby</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-green-900 dark:text-green-200">
                  Tools & Others
                </h3>
                <ul className="space-y-2 text-green-700 dark:text-green-300">
                  <li>• Git / GitHub</li>
                  <li>• VS Code</li>
                  <li>• Figma</li>
                  <li>• Node.js</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              📚 블로그 운영 방침
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  기술 블로그
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  실무에서 직접 사용해본 기술들과 문제 해결 과정을 중심으로 작성합니다. 
                  코드의 정확성과 재현 가능성을 중요하게 생각합니다.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  일상 블로그
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  여행, 맛집, 일상의 경험들을 솔직하게 기록합니다. 
                  실제 경험을 바탕으로 한 실용적인 정보 제공을 목표로 합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              💌 연락처
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                블로그에 대한 피드백이나 협업 제안이 있으시면 언제든 연락주세요!
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>📧 이메일: your-email@example.com</li>
                <li>🐙 GitHub: @your-github</li>
                <li>💼 LinkedIn: /in/your-linkedin</li>
              </ul>
            </div>
          </section>

          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                🎯 목표
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                개발자로서 성장하면서 얻은 지식을 공유하고, 
                다른 개발자들과 소통하며 함께 성장하는 것이 목표입니다.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                "배운 것을 나누고, 나눈 것을 통해 더 배우자" 💪
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`