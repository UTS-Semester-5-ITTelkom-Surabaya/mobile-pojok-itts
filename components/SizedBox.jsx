import React from 'react';
import { Box } from '@gluestack-ui/themed';
import PropTypes from 'prop-types';

export default function SizedBox({ height, width }) {
  return <Box height={height} width={width} />;
}

SizedBox.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

SizedBox.defaultProps = {
  height: 0,
  width: 0,
};
