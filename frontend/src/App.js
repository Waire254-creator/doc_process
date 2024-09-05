import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import BillingInfo from './pages/BillingInfo';
import PaymentHistory from './pages/PaymentHistory';
import UpgradeAccount from './pages/UpgradeAccount';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import CompressPDF from './pages/CompressPDF';
import OCRPDF from './pages/OCRPDF';
import OrganizePDF from './pages/OrganizePDF';
import RotatePDF from './pages/RotatePDF';
import SignPDF from './pages/SignPDF';
import WatermarkPDF from './pages/WatermarkPDF';
import RepairPDF from './pages/RepairPDF';
import NumberPDF from './pages/NumberPDF';
import EditPDF from './pages/EditPDF';
import ExtractTable from './pages/ExtractTable';
import PDFtoExcel from './pages/PDFtoExcel';
import ExceltoPDF from './pages/ExceltoPDF';
import PDFtoWord from './pages/PDFtoWord';
import WordtoPDF from './pages/WordtoPDF';
import PDFtoPowerPoint from './pages/PDFtoPowerPoint';
import PowerPointtoPDF from './pages/PowerPointtoPDF';
import HTMLtoPDF from './pages/HTMLtoPDF';
import PDFtoHTML from './pages/PDFtoHTML';
import AnalyzeExcel from './pages/AnalyzeExcel';
import AnalyzeWord from './pages/AnalyzeWord';
import AnalyzePDF from './pages/AnalyzePDF';
import AnalyzeCSV from './pages/AnalyzeCSV';
import AnalyzeText from './pages/AnalyzeText';
import AnalyzeImage from './pages/AnalyzeImage';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import './styles/global.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/IconButton.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <UserProvider>
          <AppContainer>
            <ToastContainer />
            <Header />
            <MainContent>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={UserProfile} />
                <PrivateRoute path="/billing" component={BillingInfo} />
                <PrivateRoute path="/payment-history" component={PaymentHistory} />
                <PrivateRoute path="/upgrade" component={UpgradeAccount} />
                
                {/* PDF Tools */}
                <Route path="/merge-pdf" component={MergePDF} />
                <Route path="/split-pdf" component={SplitPDF} />
                <Route path="/compress-pdf" component={CompressPDF} />
                <Route path="/ocr-pdf" component={OCRPDF} />
                <Route path="/organize-pdf" component={OrganizePDF} />
                <Route path="/rotate-pdf" component={RotatePDF} />
                <Route path="/sign-pdf" component={SignPDF} />
                <Route path="/watermark-pdf" component={WatermarkPDF} />
                <Route path="/repair-pdf" component={RepairPDF} />
                <Route path="/number-pdf" component={NumberPDF} />
                <Route path="/edit-pdf" component={EditPDF} />
                <Route path="/extract-table" component={ExtractTable} />

                {/* Conversion Tools */}
                <Route path="/pdf-to-excel" component={PDFtoExcel} />
                <Route path="/excel-to-pdf" component={ExceltoPDF} />
                <Route path="/pdf-to-word" component={PDFtoWord} />
                <Route path="/word-to-pdf" component={WordtoPDF} />
                <Route path="/pdf-to-powerpoint" component={PDFtoPowerPoint} />
                <Route path="/powerpoint-to-pdf" component={PowerPointtoPDF} />
                <Route path="/html-to-pdf" component={HTMLtoPDF} />
                <Route path="/pdf-to-html" component={PDFtoHTML} />

                {/* Analysis Tools */}
                <Route path="/analyze-excel" component={AnalyzeExcel} />
                <Route path="/analyze-word" component={AnalyzeWord} />
                <Route path="/analyze-pdf" component={AnalyzePDF} />
                <Route path="/analyze-csv" component={AnalyzeCSV} />
                <Route path="/analyze-text" component={AnalyzeText} />
                <Route path="/analyze-image" component={AnalyzeImage} />

                {/* Add a 404 route */}
                <Route component={() => <h1>404: Page Not Found</h1>} />
              </Switch>
            </MainContent>
            <Footer />
          </AppContainer>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;