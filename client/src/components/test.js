import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

export default function UseAutocomplete(props) {
  const useStyles = makeStyles((theme) => ({
    label: {
      display: "block",
    },
    input: {
      width: "90%",
      // height: "30px"
      border: "none",
      outline: "none",
    },
    listbox: {
      width: "100%",
      margin: 0,
      padding: 0,
      zIndex: 1,
      bottom: props.menuPosition === "bottom" ? null : "60px",
      top: props.menuPosition === "bottom" ? "60px": null,
      position: "absolute",
      listStyle: "none",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 200,
      border: "1px solid rgba(0,0,0,.25)",
      '& li[data-focus="true"]': {
        backgroundColor: "#4a8df6",
        color: "white",
        cursor: "pointer",
      },
      "& li:active": {
        backgroundColor: "#2977f5",
        color: "white",
      },
    },
  }));
  const classes = useStyles();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: props.options,
    getOptionLabel: (option) => typeof props.options[0] === "string" ? option : option.en,
    onChange: (e,value) => props.getData(value)
  });
  return (
    <div
      {...getRootProps()}
      style={{ position: "relative" }}
      className="insideInput"
    >
      <label className={classes.label} {...getInputLabelProps()}>
        {props.label}
      </label>
      <input
      value={props.value}
        className={classes.input}
        {...getInputProps()}
        placeholder={props.placeholder}
      />
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{typeof props.options[0] === "string" ? option : option.en}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
