const Section = (props) => {
  return (
    <section
      className={[props.className, "Section"].flat().join(" ")}
      style={props.style}
    >
      {props.children}
    </section>
  );
};

export default Section;
