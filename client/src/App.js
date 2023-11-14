import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './Pages/Home';
import Project from './Pages/Project';
import NotFound from './Pages/NotFound';
import Header from './components/Header';

import bgImg from './assets/bg.jpg';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});
const client = new ApolloClient({
  uri: 'https://pro-manager-server.vercel.app/',
  cache: cache,
});
function App() {
  return (
    <>
      <Router>
        <div className='overflow-hidden relative'
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            zIndex: '-1',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
            height: '100vh',
          }}>
          <ApolloProvider client={client} >
            <Header />
            <div className="font-mono container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ApolloProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
