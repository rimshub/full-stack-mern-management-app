import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './Pages/Home';
import Project from './Pages/Project';
import NotFound from './Pages/NotFound';
import Header from './components/Header';

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
  uri: 'http://localhost:5000/graphql',
  cache: cache,
});
function App() {
  return (
    <>
      <Router>
        <ApolloProvider client={client}>
          <Header />  
          <div className="font-mono container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ApolloProvider>
      </Router>
    </>
  );
}

export default App;
