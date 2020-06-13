import { useContext } from 'react';
import { LayoutContext } from '../context/layout';

const useLayout = () => useContext(LayoutContext);

export default useLayout;
