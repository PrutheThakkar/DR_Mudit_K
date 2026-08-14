import { graphql, useStaticQuery } from "gatsby";

const useWordPressHome = () => {
  const data = useStaticQuery(graphql`
    query WordPressHomePage {
      wpPage(databaseId: { eq: 35 }) {
        id
        databaseId
        title
        uri
        homePage {
          homePageLogoImg { node { altText sourceUrl } }
          aboutSectionLeft
          drImage { node { altText sourceUrl } }
          aboutSectionRightContent
          precisionTitle
          precisionList {
            title
            paragraph
            image { node { altText sourceUrl } }
          }
          whyChooseDrTitle
          whyChooseDrMuditKhanna {
            patientImage { node { altText sourceUrl } }
            patientPara
            patientName
          }
          whatPatientWantTitle
          whatPatientsWantPara
          faq { questions ans }
        }
      }
    }
  `);

  return data.wpPage;
};

export default useWordPressHome;
