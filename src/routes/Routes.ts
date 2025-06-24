import { PrivateRoutes } from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const RootRoutes = [...PublicRoutes,...PrivateRoutes];

export default RootRoutes;
