import Image from "next/image";
import { Container } from "@/components/Container";
import adaImg from "../../public/img/Ada_Lovelace_squared.png";
import { Markdown } from "@/components/Markdown";
import dynamic from 'next/dynamic';

const AboutMDX = dynamic(() => import('../data/about.mdx'), { ssr: true });
export const About = () => {
	return (
		<>
			<Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
				{/* Left section (Text) */}
				<div className="flex items-center w-full">
					<div className="max-w-7xl">
						<h1 className="caption">
							<span className="purple">O нас</span>
						</h1>
						<p className="basic mr-20 my-6 widget">
							{/* Image in the top-right corner */}
							<div className="relative">
								<Image
									src={adaImg}
									alt="Ada Image"
									width="500"
									height="500"
									className="rounded-full w-full lg:w-1/3 object-cover lg:float-right ml-3 mb-3" // mr-20 mt-20 - Ensure image floats and has some margin
								/>
							</div>
							<Markdown>
								<AboutMDX /> {/* Рендерим MDX файл */}
							</Markdown>
						</p>
					</div>
				</div>
			</Container>
		</>
	);
};
