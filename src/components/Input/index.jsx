/* eslint-disable react/prop-types */
export default function InputField(props) {
  return (
    <input
      min={1}
      step={props?.step}
      type={props.type}
      defaultValue={props.defaultValue}
      onChange={(e) => props.setData({ ...props.data, [props.dataKey]: e.target.value })}
      placeholder={props.placeholder}
      className={` w-[95%] border-none focus-visible:outline-none bg-transparent`}
    />
  );
}
