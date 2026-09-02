// // // routes/contact.js
// // //
// // // Handles the Contact page form:
// // //   POST /api/contact  -> anyone can submit an inquiry
// // //   GET  /api/contact   -> admin-only: view submitted inquiries
// // //                          (send the admin password as header
// // //                          x-admin-password, same as the products page)

// // const express = require("express");
// // const router = express.Router();
// // const Contact = require("../models/Contact");

// // function checkAdminPassword(req, res, next) {
// //   const passwordFromHeader = req.headers["x-admin-password"];
// //   if (passwordFromHeader !== process.env.ADMIN_PASSWORD) {
// //     return res.status(401).json({ message: "Incorrect admin password" });
// //   }
// //   next();
// // }

// // // ---------- Submit a new inquiry (public) ----------
// // router.post("/", async (req, res) => {
// //   try {
// //     const { name, business, email, message } = req.body;
// //     if (!name || !business || !email || !message) {
// //       return res.status(400).json({ message: "Please fill in all fields." });
// //     }

// //     const inquiry = await Contact.create({ name, business, email, message });
// //     res.status(201).json({ message: "Thanks! We'll get back to you within one business day.", inquiry });
// //   } catch (err) {
// //     res.status(500).json({ message: "Could not send your message", error: err.message });
// //   }
// // });

// // // ---------- View all inquiries (admin only) ----------
// // router.get("/", checkAdminPassword, async (req, res) => {
// //   try {
// //     const inquiries = await Contact.find().sort({ createdAt: -1 });
// //     res.json(inquiries);
// //   } catch (err) {
// //     res.status(500).json({ message: "Could not load inquiries", error: err.message });
// //   }
// // });

// // module.exports = router;

// // ==========================================
// // WELMORA CONTACT API
// //
// // POST /api/contact
// //
// // 1. Receives customer enquiry
// // 2. Saves enquiry to MongoDB
// // 3. Sends notification email to WELMORA
// //
// // Works with Vercel Serverless Functions
// // ==========================================

// const mongoose = require("mongoose");


// // ==========================================
// // MONGODB CONNECTION CACHE
// // ==========================================

// let cachedConnection = null;


// async function connectMongoDB() {

//     if (cachedConnection) {

//         return cachedConnection;

//     }


//     if (!process.env.MONGO_URI) {

//         throw new Error(
//             "MONGO_URI environment variable is missing"
//         );

//     }


//     cachedConnection =
//         await mongoose.connect(
//             process.env.MONGO_URI,
//             {
//                 bufferCommands: false
//             }
//         );


//     return cachedConnection;

// }


// // ==========================================
// // CONTACT SCHEMA
// // ==========================================

// const contactSchema = new mongoose.Schema(

//     {

//         name: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 100
//         },


//         business: {
//             type: String,
//             trim: true,
//             maxlength: 150,
//             default: ""
//         },


//         email: {
//             type: String,
//             required: true,
//             trim: true,
//             lowercase: true,
//             maxlength: 150
//         },


//         message: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 2000
//         },


//         status: {
//             type: String,
//             default: "new"
//         }

//     },

//     {

//         timestamps: true

//     }

// );


// // ==========================================
// // AVOID MODEL RE-CREATION ON VERCEL
// // ==========================================

// const Contact =

//     mongoose.models.Contact ||
//     mongoose.model(
//         "Contact",
//         contactSchema
//     );


// // ==========================================
// // EMAIL FUNCTION
// //
// // Uses Resend API
// // ==========================================

// async function sendEmail({

//     name,
//     business,
//     email,
//     message

// }) {

//     if (!process.env.RESEND_API_KEY) {

//         throw new Error(
//             "RESEND_API_KEY environment variable is missing"
//         );

//     }


//     if (!process.env.CONTACT_EMAIL) {

//         throw new Error(
//             "CONTACT_EMAIL environment variable is missing"
//         );

//     }


//     if (!process.env.RESEND_FROM_EMAIL) {

//         throw new Error(
//             "RESEND_FROM_EMAIL environment variable is missing"
//         );

//     }


//     const emailHTML = `

//         <div style="
//             font-family: Arial, sans-serif;
//             max-width: 650px;
//             margin: auto;
//             padding: 25px;
//             background: #fff9fc;
//         ">

//             <div style="
//                 background: #8f2858;
//                 color: white;
//                 padding: 25px;
//                 border-radius: 12px 12px 0 0;
//                 text-align: center;
//             ">

//                 <h1 style="
//                     margin: 0;
//                     font-size: 28px;
//                 ">
//                     WELMORA
//                 </h1>

//                 <p style="
//                     margin: 8px 0 0;
//                     opacity: 0.9;
//                 ">
//                     New Customer Enquiry
//                 </p>

//             </div>


//             <div style="
//                 background: white;
//                 padding: 25px;
//                 border-radius: 0 0 12px 12px;
//                 border: 1px solid #eadce4;
//             ">

//                 <h2 style="
//                     color: #54203d;
//                     margin-top: 0;
//                 ">
//                     Customer Details
//                 </h2>


//                 <p>
//                     <strong>Name:</strong>
//                     ${escapeHTML(name)}
//                 </p>


//                 <p>
//                     <strong>Business / Organisation:</strong>
//                     ${escapeHTML(business || "Not provided")}
//                 </p>


//                 <p>
//                     <strong>Email:</strong>
//                     ${escapeHTML(email)}
//                 </p>


//                 <hr style="
//                     border: none;
//                     border-top: 1px solid #eee;
//                     margin: 20px 0;
//                 ">


//                 <h3 style="
//                     color: #54203d;
//                 ">
//                     Message
//                 </h3>


//                 <div style="
//                     background: #fff5fa;
//                     padding: 18px;
//                     border-radius: 10px;
//                     line-height: 1.7;
//                     color: #555;
//                 ">

//                     ${escapeHTML(message).replace(/\n/g, "<br>")}

//                 </div>


//                 <p style="
//                     margin-top: 25px;
//                     color: #888;
//                     font-size: 12px;
//                 ">

//                     This enquiry was submitted through
//                     the WELMORA website.

//                 </p>

//             </div>

//         </div>

//     `;


//     const response = await fetch(
//         "https://api.resend.com/emails",
//         {

//             method: "POST",

//             headers: {

//                 "Authorization":
//                     `Bearer ${process.env.RESEND_API_KEY}`,

//                 "Content-Type":
//                     "application/json"

//             },

//             body: JSON.stringify({

//                 from: process.env.RESEND_FROM_EMAIL,

//                 to: [
//                     process.env.CONTACT_EMAIL
//                 ],

//                 reply_to: email,

//                 subject:
//                     `New WELMORA Enquiry from ${name}`,

//                 html: emailHTML

//             })

//         }
//     );


//     const result =
//         await response.json();


//     if (!response.ok) {

//         console.error(
//             "Resend error:",
//             result
//         );


//         throw new Error(
//             result.message ||
//             "Email could not be sent"
//         );

//     }


//     return result;

// }


// // ==========================================
// // HTML ESCAPE
// // Prevents customer input from becoming HTML
// // ==========================================

// function escapeHTML(value) {

//     return String(value || "")

//         .replace(/&/g, "&amp;")

//         .replace(/</g, "&lt;")

//         .replace(/>/g, "&gt;")

//         .replace(/"/g, "&quot;")

//         .replace(/'/g, "&#039;");

// }


// // ==========================================
// // MAIN VERCEL HANDLER
// // ==========================================

// module.exports = async function handler(
//     req,
//     res
// ) {


//     // ==========================================
//     // ONLY POST
//     // ==========================================

//     if (req.method !== "POST") {

//         return res.status(405).json({

//             message:
//                 "Method not allowed"

//         });

//     }


//     try {


//         // ==========================================
//         // CONNECT TO MONGODB
//         // ==========================================

//         await connectMongoDB();


//         // ==========================================
//         // GET DATA
//         // ==========================================

//         const {

//             name,
//             business,
//             email,
//             message

//         } = req.body || {};


//         // ==========================================
//         // VALIDATION
//         // ==========================================

//         if (!name || !email || !message) {

//             return res.status(400).json({

//                 message:
//                     "Name, email and message are required."

//             });

//         }


//         // ==========================================
//         // CLEAN DATA
//         // ==========================================

//         const cleanName =
//             String(name).trim();

//         const cleanBusiness =
//             String(business || "").trim();

//         const cleanEmail =
//             String(email).trim().toLowerCase();

//         const cleanMessage =
//             String(message).trim();


//         // ==========================================
//         // EMAIL VALIDATION
//         // ==========================================

//         const emailPattern =
//             /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//         if (!emailPattern.test(cleanEmail)) {

//             return res.status(400).json({

//                 message:
//                     "Please enter a valid email address."

//             });

//         }


//         // ==========================================
//         // LENGTH VALIDATION
//         // ==========================================

//         if (cleanName.length > 100) {

//             return res.status(400).json({

//                 message:
//                     "Name is too long."

//             });

//         }


//         if (cleanBusiness.length > 150) {

//             return res.status(400).json({

//                 message:
//                     "Business name is too long."

//             });

//         }


//         if (cleanMessage.length > 2000) {

//             return res.status(400).json({

//                 message:
//                     "Message is too long."

//             });

//         }


//         // ==========================================
//         // 1. SAVE ENQUIRY TO MONGODB
//         // ==========================================

//         const enquiry = await Contact.create({

//             name: cleanName,

//             business: cleanBusiness,

//             email: cleanEmail,

//             message: cleanMessage,

//             status: "new"

//         });


//         console.log(
//             "Contact enquiry saved:",
//             enquiry._id.toString()
//         );


//         // ==========================================
//         // 2. SEND EMAIL TO WELMORA
//         // ==========================================

//         try {

//             await sendEmail({

//                 name: cleanName,

//                 business: cleanBusiness,

//                 email: cleanEmail,

//                 message: cleanMessage

//             });


//             // Email successfully sent

//             return res.status(201).json({

//                 success: true,

//                 message:
//                     "Your enquiry has been submitted successfully.",

//                 enquiryId:
//                     enquiry._id

//             });


//         } catch (emailError) {


//             // ==========================================
//             // IMPORTANT:
//             // MongoDB SAVE SUCCEEDED even if email failed.
//             // ==========================================

//             console.error(
//                 "Email notification failed:",
//                 emailError
//             );


//             return res.status(500).json({

//                 success: false,

//                 saved: true,

//                 message:
//                     "Your enquiry was saved successfully, but the email notification could not be sent. Please contact WELMORA directly.",

//                 enquiryId:
//                     enquiry._id

//             });

//         }


//     } catch (error) {


//         console.error(
//             "Contact API error:",
//             error
//         );


//         return res.status(500).json({

//             success: false,

//             message:
//                 "Could not submit your enquiry. Please try again later."

//         });

//     }

// };
// ==========================================
// WELMORA CONTACT API
//
// POST /api/contact
//
// Customer submits form
//        ↓
// MongoDB saves enquiry
//        ↓
// Gmail sends notification
//        ↓
// Rvntraders1@gmail.com receives email
// ==========================================

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// ==========================================
// MONGODB CONNECTION
// ==========================================

let cachedConnection = null;

async function connectMongoDB() {

    if (cachedConnection) {
        return cachedConnection;
    }

    if (!process.env.MONGO_URI) {
        throw new Error(
            "MONGO_URI environment variable is missing"
        );
    }

    cachedConnection = await mongoose.connect(
        process.env.MONGO_URI,
        {
            bufferCommands: false
        }
    );

    return cachedConnection;
}

// ==========================================
// CONTACT SCHEMA
// ==========================================

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        business: {
            type: String,
            trim: true,
            maxlength: 150,
            default: ""
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 150
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        status: {
            type: String,
            default: "new"
        }
    },
    {
        timestamps: true
    }
);

// Prevent model re-creation on Vercel
const Contact =
    mongoose.models.Contact ||
    mongoose.model("Contact", contactSchema);

// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// GMAIL TRANSPORTER
// ==========================================

function createTransporter() {

    if (!process.env.GMAIL_USER) {
        throw new Error(
            "GMAIL_USER environment variable is missing"
        );
    }

    if (!process.env.GMAIL_APP_PASSWORD) {
        throw new Error(
            "GMAIL_APP_PASSWORD environment variable is missing"
        );
    }

    return nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }

    });
}

// ==========================================
// SEND EMAIL
// ==========================================

async function sendEmail({
    name,
    business,
    email,
    message
}) {

    const transporter = createTransporter();

    const emailHTML = `

        <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: auto;
            padding: 25px;
            background: #fff9fc;
        ">

            <div style="
                background: #8f2858;
                color: white;
                padding: 25px;
                border-radius: 12px 12px 0 0;
                text-align: center;
            ">

                <h1 style="
                    margin: 0;
                    font-size: 28px;
                ">
                    WELMORA
                </h1>

                <p style="
                    margin: 8px 0 0;
                    opacity: 0.9;
                ">
                    New Customer Enquiry
                </p>

            </div>


            <div style="
                background: white;
                padding: 25px;
                border-radius: 0 0 12px 12px;
                border: 1px solid #eadce4;
            ">

                <h2 style="
                    color: #54203d;
                    margin-top: 0;
                ">
                    Customer Details
                </h2>


                <p>
                    <strong>Name:</strong>
                    ${escapeHTML(name)}
                </p>


                <p>
                    <strong>Business / Organisation:</strong>
                    ${escapeHTML(
                        business || "Not provided"
                    )}
                </p>


                <p>
                    <strong>Customer Email:</strong>
                    ${escapeHTML(email)}
                </p>


                <hr style="
                    border: none;
                    border-top: 1px solid #eee;
                    margin: 20px 0;
                ">


                <h3 style="
                    color: #54203d;
                ">
                    Message
                </h3>


                <div style="
                    background: #fff5fa;
                    padding: 18px;
                    border-radius: 10px;
                    line-height: 1.7;
                    color: #555;
                    white-space: normal;
                ">

                    ${escapeHTML(message)
                        .replace(/\n/g, "<br>")}

                </div>


                <p style="
                    margin-top: 25px;
                    color: #888;
                    font-size: 12px;
                ">

                    This enquiry was submitted through
                    the WELMORA website.

                </p>

            </div>

        </div>

    `;


    // ==========================================
    // SEND TO RVNTRADERS
    // ==========================================

    const mailOptions = {

        from: process.env.GMAIL_USER,

        to: "Rvntraders1@gmail.com",

        replyTo: email,

        subject:
            `New WELMORA Enquiry from ${name}`,

        html: emailHTML

    };


    const result =
        await transporter.sendMail(mailOptions);


    console.log(
        "WELMORA email sent:",
        result.messageId
    );


    return result;
}

// ==========================================
// MAIN VERCEL HANDLER
// ==========================================

module.exports = async function handler(
    req,
    res
) {

    // ==========================================
    // ONLY POST
    // ==========================================

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            message: "Method not allowed"

        });

    }


    try {

        // ==========================================
        // CONNECT TO MONGODB
        // ==========================================

        await connectMongoDB();


        // ==========================================
        // GET FORM DATA
        // ==========================================

        const {
            name,
            business,
            email,
            message
        } = req.body || {};


        // ==========================================
        // REQUIRED FIELD VALIDATION
        // ==========================================

        if (!name || !email || !message) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and message are required."

            });

        }


        // ==========================================
        // CLEAN DATA
        // ==========================================

        const cleanName =
            String(name).trim();

        const cleanBusiness =
            String(business || "").trim();

        const cleanEmail =
            String(email)
                .trim()
                .toLowerCase();

        const cleanMessage =
            String(message).trim();


        // ==========================================
        // EMAIL VALIDATION
        // ==========================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(cleanEmail)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }


        // ==========================================
        // LENGTH VALIDATION
        // ==========================================

        if (cleanName.length > 100) {

            return res.status(400).json({

                success: false,

                message: "Name is too long."

            });

        }


        if (cleanBusiness.length > 150) {

            return res.status(400).json({

                success: false,

                message:
                    "Business name is too long."

            });

        }


        if (cleanMessage.length > 2000) {

            return res.status(400).json({

                success: false,

                message:
                    "Message is too long."

            });

        }


        // ==========================================
        // SAVE TO MONGODB
        // ==========================================

        const enquiry =
            await Contact.create({

                name: cleanName,

                business: cleanBusiness,

                email: cleanEmail,

                message: cleanMessage,

                status: "new"

            });


        console.log(
            "Contact enquiry saved:",
            enquiry._id.toString()
        );


        // ==========================================
        // SEND EMAIL
        // ==========================================

        try {

            await sendEmail({

                name: cleanName,

                business: cleanBusiness,

                email: cleanEmail,

                message: cleanMessage

            });


            // ==========================================
            // SUCCESS
            // ==========================================

            return res.status(201).json({

                success: true,

                message:
                    "Your enquiry has been submitted successfully. We will contact you soon.",

                enquiryId:
                    enquiry._id

            });

        }

        // catch (emailError) {

        //     console.error(
        //         "Gmail notification failed:",
        //         emailError
        //     );


        //     // MongoDB saved successfully
        //     // but email failed

        //     return res.status(500).json({

        //         success: false,

        //         saved: true,

        //         message:
        //             "Your enquiry was saved successfully, but the email notification could not be sent. Please try again later.",

        //         enquiryId:
        //             enquiry._id

        //     });

        // }

                catch (emailError) {

            // The customer's message is already safely saved in
            // MongoDB at this point - a failed email notification
            // shouldn't make the form look broken to them. Just
            // log it quietly so you (the site owner) can check
            // your email setup later.

            console.error(
                "Gmail notification failed (enquiry was still saved):",
                emailError.message
            );


            return res.status(201).json({

                success: true,

                message:
                    "Your enquiry has been submitted successfully. We will contact you soon.",

                enquiryId:
                    enquiry._id

            });

        }

    }

    catch (error) {

        console.error(
            "Contact API error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Could not submit your enquiry. Please try again later."

        });

    }

};