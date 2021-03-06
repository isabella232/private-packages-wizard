import React from 'react';
import PropTypes from 'prop-types';

import { InputGroup, InputGroupAddon, Input, Label } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyBtn from './CopyBtn';


const LibraryResult = ({
  project, reqUrl, isLibrary,
}) => {
  if (isLibrary !== true) {
    return null;
  }


  const requires = `"${project}@${reqUrl}",`;
  return (
    <div className="alert alert-warning">
      <Label>
        When requiring this library in a <code>setup.py</code>, use this in your <code>install_requires</code>:
      </Label>
      <InputGroup>
        <Input value={requires} disabled name="requires" />
        <CopyToClipboard text={requires}>
          <InputGroupAddon><CopyBtn /></InputGroupAddon>
        </CopyToClipboard>
      </InputGroup>
    </div>
  );
};

LibraryResult.propTypes = {
  reqUrl: PropTypes.string,
  project: PropTypes.string,
  isLibrary: PropTypes.bool,
};

LibraryResult.defaultProps = {
  reqUrl: null,
  project: null,
  isLibrary: null,
};

export default LibraryResult;
