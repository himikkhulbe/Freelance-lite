import DetailCard from './components/Detailcard/DetailCard'
import { Mail, Phone, Github, Linkedin, Globe, Twitter, Calendar, Eye, MapPin } from 'lucide-react'


function DetailsSection({ user, loggedInUser, formatDate, profileOpen }) {
    return (
        <div className="lg:w-[32%] w-full flex flex-col xl:gap-[30px] gap-[20px]">


            {/* contact info */}
            {user?.user?.contactInfo?.email || user?.user?.contactInfo?.phone ?
                <DetailCard title="Contact Information" open={profileOpen} edit={true} user={user} loggedInUser={loggedInUser} data={[{
                    Icon: Mail,
                    text: user?.user?.contactInfo?.email,
                },
                {
                    Icon: Phone,
                    text: user?.user?.contactInfo?.phone,
                }
                ]} />
                :
                null
            }



            {/* Member since */}
            <DetailCard title="Member Since" user={user} loggedInUser={loggedInUser} data={[{
                Icon: Calendar,
                text: formatDate(user?.user?.createdAt),
            },
            {
                Icon: MapPin,
                text: user?.user?.location
            }
            ]} />


            {/* Social Links */}
            {user?.user?.socialMedia?.Github || user?.user?.socialMedia?.Linkedin || user?.user?.socialMedia?.Twitter || user?.user?.socialMedia?.Portfolio ?
                <DetailCard title="Social Links" open={profileOpen} edit={true} user={user} loggedInUser={loggedInUser} data={[{
                    Icon: Github,
                    link: user?.user?.socialMedia?.Github,
                    text: user?.user?.socialMedia?.Github ? "Github" : "",
                },
                {
                    Icon: Linkedin,
                    link: user?.user?.socialMedia?.Linkedin,
                    text: user?.user?.socialMedia?.Linkedin ? "Linkedin" : "",
                },
                {
                    Icon: Twitter,
                    link: user?.user?.socialMedia?.Twitter,
                    text: user?.user?.socialMedia?.Twitter ? "Twitter" : "",
                },
                {
                    Icon: Globe,
                    link: user?.user?.socialMedia?.Portfolio,
                    text: user?.user?.socialMedia?.Portfolio ? "Portfolio" : "",
                }
                ]} />
                :
                null}

        </div>
    )
}

export default DetailsSection