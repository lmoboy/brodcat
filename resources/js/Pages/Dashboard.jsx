import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Dashboard() {
    const { data, setData, post, processing, errors } = useForm({
        message: '',
    });

    const [messages, setMessages] = useState([]);
function formatData(data) {
    return data.map((message) => {
        return {
            'message': message.message,
            'user': {
                'name': message.name
            }
        }
    })
}

    useEffect(() => {
        fetch(route('messages.index')).then(res => res.json()).then((data) => setMessages(
            formatData(
                data
        )
        ));

        window.Echo.channel("messageChannel").listen("testEvent", (e) => {
            setMessages((prev) => [...prev, e]);
        });
        console.log(messages)
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        // console.log(data);
        post(route('messages.store'), {
            onSuccess: () => setData({ message: '' }),
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col max-h-48 overflow-scroll">
                                {messages.map((message, index) => (
                                    <span key={index} className="flex row ">
                                        <p>{message.user.name}:</p>                                    <div >
                                        {message.message}
                                    </div>
                                    </span>

                                ))}
                            </div>
                            <form className="flex row w-full" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="message"
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                <button type="submit"
                                    className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                    disabled={processing}
                                >Send</button>
                            </form>
                            {errors.message && <div className="text-red-500">{errors.message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

