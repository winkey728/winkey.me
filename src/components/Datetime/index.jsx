import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import "moment/locale/zh-cn";
import "moment/locale/de";
import "moment/locale/fr";
import "moment/locale/es";
import "moment/locale/pt";

const Datetime = ({ datetime, format, locale }) => (
  <time dateTime={datetime}>
    {moment
      .utc(datetime)
      .locale(locale)
      .local()
      .format(format)}
  </time>
);

Datetime.propTypes = {
  datetime: PropTypes.string.isRequired,
  format: PropTypes.string,
  locale: PropTypes.oneOf(["en", "zh-CN", "de", "fr", "es", "pt"])
};

Datetime.defaultProps = {
  format: "YYYY-MM-DD HH:mm:ss",
  locale: "zh-CN"
};

export default Datetime;
