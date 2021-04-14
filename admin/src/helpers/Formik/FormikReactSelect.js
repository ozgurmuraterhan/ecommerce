import React from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import Select from "react-select";
// import AsyncSelect from 'react-select/async';

export class FormikReactSelect extends React.Component {
  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <Select
        formatGroupLabel={this.props.formatGroupLabel}
        name={this.props.name}
        placeholder={this.props.placeholder}
        className={`react-select ${this.props.className}`}
        classNamePrefix="react-select"
        options={this.props.options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        components={this.props.components}
        isMulti={this.props.isMulti}
        defaultValue={this.props.defaultValue}
        error={this.props.error}
        touched={this.props.touched}
      />
    );
  }
}
