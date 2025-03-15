import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import RedeSocial from "./RedeSocial";


export default function RedeSociais() {
    return (
        <div className="flex">
            <RedeSocial icone={<IconBrandInstagram/>} url="https://www.instagram.com/_paraiba777/"/>
            <RedeSocial icone={<IconBrandFacebook/>} url="https://www.facebook.com/rebeka.carolinne"/>
            <RedeSocial icone={<IconBrandGithub/>} url="https://www.linkedin.com/in/tiago-kelis/"/>
            <RedeSocial icone={<IconBrandLinkedin/>} url="https://github.com/tiago-kelis"/>
        </div>
    )
}