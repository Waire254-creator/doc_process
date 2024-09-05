import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '../components/IconButton';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ToolsSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Home = () => {
  const { t } = useTranslation();

  const pdfTools = [
    { name: 'Merge PDF', icon: '/images/merge_pdf.png', path: '/merge_pdf' },
    { name: 'Split PDF', icon: '/images/split_pdf.png', path: '/split_pdf' },
    { name: 'Compress PDF', icon: '/images/compress_pdf.png', path: '/compress_pdf' },
    { name: 'Organize PDF', icon: '/images/organize_pdf.png', path: '/organize_pdf' },
    { name: 'Rotate PDF', icon: '/images/rotate_pdf.png', path: '/rotate_pdf' },
    { name: 'Sign PDF', icon: '/images/sign_pdf.png', path: '/sign_pdf' },
  ];

  const conversionTools = [
    { name: 'PDF to Excel', icon: '/images/pdf_to_excel.png', path: '/pdf_to_excel' },
    { name: 'Excel to PDF', icon: '/images/excel_to_pdf.png', path: '/excel_to_pdf' },
    { name: 'PDF to Word', icon: '/images/pdf_to_word.png', path: '/pdf_to_word' },
    { name: 'Word to PDF', icon: '/images/word_to_pdf.png', path: '/word_to_pdf' },
    { name: 'PDF to PowerPoint', icon: '/images/pdf_to_powerpoint.png', path: '/pdf_to_powerpoint' },
    { name: 'PowerPoint to PDF', icon: '/images/powerpoint_to_pdf.png', path: '/powerpoint_to_pdf' },
  ];

  const analysisTools = [
    { name: 'Analyze Excel', icon: '/images/analyze_excel.png', path: '/analyze_excel' },
    { name: 'Analyze Word', icon: '/images/analyze_word.png', path: '/analyze_word' },
    { name: 'Analyze PDF', icon: '/images/analyze_pdf.png', path: '/analyze_pdf' },
    { name: 'Analyze CSV', icon: '/images/analyze_csv.png', path: '/analyze_csv' },
    { name: 'Analyze Text', icon: '/images/analyze_text.png', path: '/analyze_text' },
    { name: 'Analyze Image', icon: '/images/analyze_image.png', path: '/analyze_image' },
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>{t('home.title')}</Title>
        <Subtitle>{t('home.subtitle')}</Subtitle>
        <Link to="/pricing">
          <button>{t('home.getStarted')}</button>
        </Link>
      </Hero>

      <ToolsSection>
        <SectionTitle>{t('home.pdfTools')}</SectionTitle>
        <ToolsGrid>
          {pdfTools.map((tool) => (
            <IconButton
              key={tool.name}
              to={tool.path}
              icon={tool.icon}
              text={t(`tools.${tool.name.toLowerCase().replace(' ', '')}`)}
            />
          ))}
        </ToolsGrid>
      </ToolsSection>

      <ToolsSection>
        <SectionTitle>{t('home.conversionTools')}</SectionTitle>
        <ToolsGrid>
          {conversionTools.map((tool) => (
            <IconButton
              key={tool.name}
              to={tool.path}
              icon={tool.icon}
              text={t(`tools.${tool.name.toLowerCase().replace(' ', '')}`)}
            />
          ))}
        </ToolsGrid>
      </ToolsSection>

      <ToolsSection>
        <SectionTitle>{t('home.analysisTools')}</SectionTitle>
        <ToolsGrid>
          {analysisTools.map((tool) => (
            <IconButton
              key={tool.name}
              to={tool.path}
              icon={tool.icon}
              text={t(`tools.${tool.name.toLowerCase().replace(' ', '')}`)}
            />
          ))}
        </ToolsGrid>
      </ToolsSection>
    </HomeContainer>
  );
};

export default Home;