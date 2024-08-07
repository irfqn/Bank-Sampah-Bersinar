/* eslint-disable react/prop-types */
import { useState } from "react";
import Sidebar from "./components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AdminEducation = () => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    }

    const handleSubmit = async () => {
        try {
            // Format content with <p> tags for paragraphs
            const formattedArticle = article.split('\n').map(para => `<p>${para}</p>`).join('');
            const formData = {
                picture: image,
                title: title,
                article: formattedArticle
            };

            const response = await fetch("https://bank-sampah-bersinar2-b3ffehbphqdqgshh.southeastasia-01.azurewebsites.net/api/user/postEdu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            // Clear form after successful submission
            setImage('');
            setTitle('');
            setArticle('');

            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit data. Please try again later.");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <EducationMain
                handleFileUpload={handleFileUpload}
                image={image}
                setTitle={setTitle}
                setArticle={setArticle}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

const EducationMain = ({ handleFileUpload, setTitle, setArticle, handleSubmit }) => {
    return (
        <div className="h-screen flex-1 p-7 education-main-page" style={{ backgroundColor: "#FFFFFF" }}>
            <h1 className="text-2xl font-semibold">Education Mitra</h1>
            <p style={{ marginBlock: "1rem" }}>Masukan data mitra disini!</p>
            <main className="education-container">
                <div className="input-education">
                    <Label className="font-semibold">Foto</Label>
                    <Input
                        type="file"
                        style={{ width: "300px" }}
                        onChange={handleFileUpload}
                    />
                </div>
                <div className="input-education">
                    <Label className="font-semibold">Judul</Label>
                    <Input
                        type="text"
                        placeholder="Judul Artikel"
                        style={{ width: "300px" }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-education">
                    <Label className="font-semibold">Isi Artikel</Label>
                    <Textarea
                        placeholder="Type your message here."
                        style={{ width: "600px" }}
                        onChange={(e) => setArticle(e.target.value)}
                    />
                </div>
                <Button
                    style={{ backgroundColor: "green", color: "white", marginTop: "1rem" }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </main>
        </div>
    );
};

export default AdminEducation;
