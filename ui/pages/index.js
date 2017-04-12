import React from 'react';
import apollo from '../common/apollo';
import Layout from '../components/layout/Layout';
import FurnitureLayout from '../components/furniture/FurnitureLayout';

export default apollo(() => <Layout title="ITU - Fun Designer">
  <FurnitureLayout />
</Layout>);
