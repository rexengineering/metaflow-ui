function fontAwesomeIcon(props, propName, componentName) {
  const prop = props[propName];
  if (
    propName === "icon" &&
    Array.isArray(prop?.icon) &&
    typeof prop?.iconName === "string" &&
    typeof prop?.prefix === "string"
  ) {
    return undefined;
  }
  return new Error(
    `Failed prop type: Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected Font Awesome Icon.`
  );
}
export default fontAwesomeIcon;
