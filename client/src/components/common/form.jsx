// import React from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Controller } from "react-hook-form"; // Import Controller for Select

// function CommonForm({ formControls, register, handleSubmit, onSubmit, buttonText, errors, isSubmitting, control }) {
//     function renderInputByComponentTypes(controlItem) {
//         let element = null;

//         switch (controlItem.componentType) {
//             case "input":
//                 element = (
//                     <>
//                         <Input
//                             name={controlItem.name}
//                             placeholder={controlItem.placeholder}
//                             id={controlItem.name}
//                             type={controlItem.type}
//                             {...register(controlItem.name, controlItem.validation)}
//                         />
//                         {errors[controlItem.name] && <p className="text-red-500">{errors[controlItem.name]?.message}</p>}
//                     </>
//                 );
//                 break;

//             case "select":
//                 element = (
//                     <>
//                         <Controller
//                             name={controlItem.name}
//                             control={control}
//                             rules={controlItem.validation}
//                             render={({ field }) => (
//                                 <Select onValueChange={field.onChange} value={field.value}>
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder={controlItem.placeholder} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {controlItem.options?.map(optionItem => (
//                                             <SelectItem key={optionItem.id} value={optionItem.id}>
//                                                 {optionItem.label}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             )}
//                         />
//                         {errors[controlItem.name] && <p className="text-red-500">{errors[controlItem.name]?.message}</p>}
//                     </>
//                 );
//                 break;

//             case "textarea":
//                 element = (
//                     <>
//                         <Textarea
//                             name={controlItem.name}
//                             placeholder={controlItem.placeholder}
//                             id={controlItem.name}
//                             {...register(controlItem.name, controlItem.validation)}
//                         />
//                         {errors[controlItem.name] && <p className="text-red-500">{errors[controlItem.name]?.message}</p>}
//                     </>
//                 );
//                 break;

//             default:
//                 element = (
//                     <>
//                         <Input
//                             name={controlItem.name}
//                             placeholder={controlItem.placeholder}
//                             id={controlItem.name}
//                             type={controlItem.type}
//                             {...register(controlItem.name, controlItem.validation)}
//                         />
//                         {errors[controlItem.name] && <p className="text-red-500">{errors[controlItem.name]?.message}</p>}
//                     </>
//                 );
//                 break;
//         }

//         return element;
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-3">
//                 {formControls.map(controlItem => (
//                     <div className="grid w-full gap-1.5" key={controlItem.name}>
//                         <Label className="mb-1" htmlFor={controlItem.name}>
//                             {controlItem.label}
//                         </Label>
//                         {renderInputByComponentTypes(controlItem)}
//                     </div>
//                 ))}
//             </div>
            // <Button disabled={isSubmitting} type="submit" className="mt-3 w-full">
//                 {buttonText || "Submit"}
//             </Button>
//         </form>
//     );
// }

// export default CommonForm;
