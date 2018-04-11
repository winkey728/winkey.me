import React from "react";
import styled from "styled-components";
import Paper from "material-ui/Paper";
import { entry, entryDetail } from "../../utils/styles";

const Entry = styled(Paper).attrs({
  elevation: 8,
  square: true
})`
  ${entry};
`;

const EntryDetail = Entry.extend`
  ${entryDetail};
`;

const EntryThumbnail = Entry.extend`
  transition: box-shadow 0.3s;
`;

const EntryContent = styled.div`
  padding: ${props => props.theme.spacing.unit * 3}px 1.2rem;
`;

export default Entry;

export { EntryDetail, EntryThumbnail, EntryContent };
