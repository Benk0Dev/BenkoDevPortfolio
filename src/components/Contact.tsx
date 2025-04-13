import { useState } from "react";
import { SendHorizontal, LoaderCircle } from "lucide-react";

const FORM_HOST = "https://formspree.io/f/mgegdeop";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        message: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset success and error messages
        setShowSuccess(false);
        setShowError(false);

        // Validate form data
        setErrors({
            firstName: false,
            lastName: false,
            email: false,
            message: false,
        });

        let isValid = true;

        // Check if any field is empty
        if (formData.firstName === "") {
            setErrors((prev) => ({ ...prev, firstName: true }));
            isValid = false;
        }
        if (formData.lastName === "") {
            setErrors((prev) => ({ ...prev, lastName: true }));
            isValid = false;
        }
        if (formData.email === "") {
            setErrors((prev) => ({ ...prev, email: true }));
            isValid = false;
        }
        if (formData.message === "") {
            setErrors((prev) => ({ ...prev, message: true }));
            isValid = false;
        }

        // Check if email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setErrors((prev) => ({ ...prev, email: true }));
            isValid = false;
        }
        
        // Check if there are any errors
        if (!isValid) {
            return;
        }

        // Send form data to Formspree
        setIsSubmitting(true);
        try {
            const response = await fetch(FORM_HOST, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
                setShowSuccess(true);
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <div id="contact" className="container">
                <h1>Contact Me</h1>
                <form onSubmit={handleSubmit}>
                    <div className="double-row">
                        <div className="entry-container">
                            <label>
                                First Name{errors.firstName && <span className="error">*</span>}
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="entry-container">
                            <label htmlFor="lname">
                                Last Name{errors.lastName && <span className="error">*</span>}
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="entry-container">
                        <label htmlFor="email">
                            Email{errors.email && <span className="error">*</span>}
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="entry-container">
                        <label htmlFor="message">
                            Message{errors.message && <span className="error">*</span>}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            style={!showSuccess && !showError ? {marginBottom: "1.5em"} : undefined}
                        ></textarea>
                    </div>
                    {showSuccess && (
                        <p className="response-message">
                            🎉 Your message has been sent successfully! Thank you for reaching out.
                        </p>
                    )}
                    {showError && (
                        <p className="response-message">
                            ❌ Oops! Something went wrong. Please try again.
                        </p>
                    )}
                    <button type="submit" className="btn btn-sqr two-cols">
                        {isSubmitting ? (
                            <LoaderCircle size="1em" strokeWidth={2.75} className="spin" />
                        ) : (
                            <>
                                Send<SendHorizontal size="1em" strokeWidth={2.75} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div> 
    );
}