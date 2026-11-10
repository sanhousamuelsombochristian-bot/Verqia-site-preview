import { domAnimation, domMax } from 'motion/react';

// Keep the small default feature set, adding only layout projection for the nav indicator.
const motionFeatures = { ...domAnimation, layout: domMax.layout };
export default motionFeatures;
