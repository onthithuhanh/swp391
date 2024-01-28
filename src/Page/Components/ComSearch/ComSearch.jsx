
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import ComInput from "../../Components/ComInput/ComInput";
import { textApp } from "../../../TextContent/textApp";
import ComButton from "../ComButton/ComButton";



export default function ComSearch() {
    const methods = useForm({
        defaultValues: {

        },
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {
    }
    return (
        <>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 p-8 sm:mt-8 w-11/12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ">


                        <ComInput
                            type="text"
                            label='Tên khách Hàng'
                            placeholder='Tên khách Hàng'
                            {...register("name")}
                            labelClassName=' w-48'
                            className="flex gap-3 items-baseline"

                        />


                        <ComInput
                            label="Tên Dự Án"
                            placeholder="Tên Dự Án "
                            type="text"
                            labelClassName=' w-48'
                            className="flex gap-3 items-baseline"
                            {...register("shape")}
                        />



                        <ComInput
                            label='Version'
                            placeholder='Version'

                            className="flex gap-3 items-baseline"
                            labelClassName=' w-48'
                            type="text"
                            {...register("shape")}
                        />

                        <ComInput
                            label='Trạng thái'
                            placeholder='Trạng thái'

                            className="flex gap-3 items-baseline"
                            labelClassName=' w-48'
                            type="text"
                            {...register("shape")}
                        />


                    </div>
                    <div className="mt-10 flex justify-end">
                        <button


                            htmlType="submit"
                            type="primary"
                            className="block  rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Tìm Kiếm
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    )

}

