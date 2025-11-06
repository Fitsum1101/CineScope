import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IProps {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string | undefined;
}
const RHFTextField = ({
  name,
  isRequired = true,
  label,
  placeholder,
  type = "text",
  ...other
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name}>
        {label}
        {isRequired ? (
          <span className="text-red-500 align-middle">{" *"}</span>
        ) : (
          <span className="text-[#929292] font-normal text-[10px]">{`(optional)`}</span>
        )}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          const value =
            type === "number"
              ? e.target.value
                ? parseFloat(e.target.value)
                : undefined
              : e.target.value;
        }}
        className={`w-full px-4 py-2 transition-all border rounded-lg bg-input border-primary/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary`}
        {...other}
      />
      {/* {error && <p className="text-xs text-red-500">{error.message}</p>} */}
    </div>
  );
};

export default RHFTextField;
