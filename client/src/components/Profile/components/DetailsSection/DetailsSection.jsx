import DetailCard from './components/Detailcard/DetailCard'
import { Mail, Phone, Github, Linkedin, Globe, Twitter, Calendar, Eye } from 'lucide-react'


function DetailsSection({ user, loggedInUser, formatDate ,profileOpen, socialOpen }) {
    return (
        <div className="lg:w-[32%] w-full flex flex-col xl:gap-[30px] gap-[20px]">


            {/* contact info */}
            <DetailCard title="Contact Information" open={profileOpen} edit={true} user={user} loggedInUser={loggedInUser} data={[{
                Icon: Mail,
                text: user?.user?.contactInfo?.email,
            },
            {
                Icon: Phone,
                text: user?.user?.contactInfo?.phone,
            }
            ]} />


            {/* Member since */}
            <DetailCard title="Member Since" user={user} loggedInUser={loggedInUser} data={[{
                Icon: Calendar,
                text: formatDate(user?.user?.createdAt),
            }
            ]} />


            {/* Social Links */}
            <DetailCard title="Social Links" open={socialOpen} edit={true} user={user} loggedInUser={loggedInUser} data={[{
                Icon: Github,
                link: user?.user?.socialMedia?.Github,
                text: "Github",
            },
            {
                Icon: Linkedin,
                link: user?.user?.socialMedia?.Linkedin,
                text: "Linkedin",
            },
            {
                Icon: Twitter,
                link: user?.user?.socialMedia?.Twitter,
                text: "Twitter",
            },
            {
                Icon: Globe,
                link: user?.user?.socialMedia?.Portfolio,
                text: "Portfolio",
            }
            ]} />
        </div>
    )
}

export default DetailsSection