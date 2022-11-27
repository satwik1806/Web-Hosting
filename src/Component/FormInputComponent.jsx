import React from 'react'
import {  Controller } from "react-hook-form";

function FormInputComponent({
    label,
    labelStrong,
    required,
    control,
    ...props
}) {
    return (
        <div
            style={{ opacity: props.disabled ? 0.5 : 1 }}
        >
            <label htmlFor={props.id || props.name} className="block text-sm font-normal text-black my-2">
                {labelStrong ? <strong>{label}</strong> : <>{label}</>}
                {required && <span className="text-red"> *</span>}
            </label>
            <div>
                <>
                    <div >
                        <Controller
                            name={props.name}
                            control={control}
                            render={({ field, fieldState }) => (
                                <input
                                    type={props?.type}
                                    id={field.name}
                                    placeholder={props?.placeholder}
                                    className={`w-full  p-3  border-[0.5px] text-sm ${props.error ? "border-red" :"border-gray"} rounded-lg shadow-sm`}
                                    {...field}
                                    maxlength={props?.length ? props?.length : 500}
                                />
                            )}
                        />
                    </div>
                    {props.error && 
                        <div className="block text-[.6rem] font-medium text-red my-1 opacity-70">{props.error}</div>
                    }
                </>
            </div>
        </div>
    )
}

export default FormInputComponent