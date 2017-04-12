import React from 'react';
import apollo from '../common/apollo';
import Layout from '../components/layout/Layout';
import Activate from '../components/user/Activate';

export default apollo(() => <Layout title="ITU - Fun Designer">
  <Activate />
</Layout>);
