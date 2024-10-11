import { IconProps } from ".";

const SendIcon = ({
  height = "25",
  width = "25",
  color = "#0C1132",
  className,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      className={className}
    >
      <path
        d="M11.2184 18.7821L27.0564 2.94402M4.14472 8.33011L23.5585 1.85885C26.3909 0.914706 29.0856 3.60938 28.1415 6.44182L21.6702 25.8556C20.6495 28.9178 16.4359 29.2173 14.9923 26.3302L11.7584 19.8623C11.4078 19.1611 10.8392 18.5925 10.138 18.2419L3.67013 15.008C0.783024 13.5644 1.08248 9.35086 4.14472 8.33011Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
