import { useRoutes } from 'react-router-dom';
import RootRoutes from './routes/Routes';
import '~/styles/font.css';
import '~/styles/antd.css';

function App() {
    const router = useRoutes(RootRoutes);
    return router;
}

export default App;
