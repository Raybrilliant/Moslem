import BottomNavbar from "@/components/BottomNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <>
      <div className="container min-h-screen py-5">
        <Suspense fallback={<Loading />}>
          <div className="mb-5 standalone:mt-10">
            <h1 className="text-3xl font-medium">About</h1>
            <Card className="p-5 my-5">
              <p className=" text-justify">
                Welcome to Moslem, an app crafted by an Indonesian Muslim
                developer. Created as a secure and comfortable alternative.{" "}
                <br />
                <br /> Moslem offers a worship experience free from spyware and
                inappropriate ads. With an intuitive design, prayer schedules,
                and Quranic readings, <br /> <br />
                Moslem stands as a faithful companion for Muslims. Providing a
                better worship experience.
              </p>
            </Card>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col space-y-2"
            >
              <Card className="px-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Our Mission</AccordionTrigger>
                  <AccordionContent>
                    At Moslem, our mission is to empower Muslim communities
                    through technology, <br />
                    <br />
                    fostering strong connections between God and humanity
                    (Habluminallah) and among people (Habluminannass). <br />
                    <br /> We strive to collaborate with other Muslim platforms
                    to facilitate the ease of performing religious deeds. In
                    embarking on this journey, <br />
                    <br /> we currently focus on providing services such as
                    prayer schedules and Quranic resources.
                  </AccordionContent>
                </AccordionItem>
              </Card>
              <Card className="px-2">
                <AccordionItem value="item-2">
                  <AccordionTrigger>Privacy Policy</AccordionTrigger>
                  <AccordionContent>
                    Privacy is of utmost importance to us at Moslem. We deeply
                    respect your privacy and firmly believe that everyone has
                    the right to protect their data. Rest assured, we do not
                    collect any information, including{" "}
                    <b>
                      analytics, personal details, IP addresses, or GPS data
                    </b>
                    . Your trust is our priority, and we are dedicated to
                    providing a secure space where your information remains
                    confidential.
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </Accordion>
            <p className="text-xs text-emerald-600 my-10 text-center">
              Moslem v1.1.5
            </p>
          </div>
        </Suspense>
      </div>
      <BottomNavbar />
    </>
  );
};

export default page;
