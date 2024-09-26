import { prisma } from "@/lib/prisma";
import "swiper/swiper-bundle.css";

import GoodHeader from "@/components/GoodDetails/GoodHeader";
import GoodDivider from "@/components/GoodDetails/GoodDivider";
import ImageSwiper from "@/components/GoodDetails/ImageSwiper";
import GoodInfo from "@/components/GoodDetails/GoodInfo";
import GoodItem from "@/components/common/GoodItem";
import GoodOrder from "@/components/GoodDetails/GoodOrder";
import { computeProductTotalPrice } from "@/helpers/product";
import ZoomImage from "@/components/zoomImage/ZoomImage";

const getGoodDetails = async (goodId: string) => {
    const good = await prisma.good.findUnique({
        where: {
            id: goodId,
        },
    });
    if (!good) return null;

    const relatedGoods = await prisma.good.findMany({
        where: {
            name: good.name,
            id: {
                not: good.id,
            }
        },
    });

    await prisma.$disconnect();

    return { good, relatedGoods };
};

const GoodDetails = async ({ params }: { params: { goodId: string } }) => {
    const goodDetails = await getGoodDetails(params.goodId);

    if (!goodDetails) return null;

    const { good, relatedGoods } = goodDetails;

    return (
        <section className="overflow-x-hidden dark:bg-[#18181b] w-full">
            <div className="w-full h-full flex mt-[66px] flex lg:flex-row flex-col justify-center">
                <div className="lg:w-1/3 w-full h-full p-4">
                    {/* <ImageSwiper imagesUrl={good.imagesUrl} /> */}
                    <ZoomImage coverImage={good.coverImage} />
                </div>
                <div className="lg:w-1/2 w-full h-full p-8">
                    <GoodHeader good={good} />
                    <GoodDivider />
                    <GoodOrder product={computeProductTotalPrice(good)} />
                    <GoodDivider />
                    <GoodInfo good={good} />
                </div>
            </div>

            <div className="w-full mx-auto p-4 flex flex-col">

                <GoodDivider />
                <section className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
                    {relatedGoods.map((good: any) => (
                        <GoodItem good={good} key={good.id} product={computeProductTotalPrice(good)} />
                    ))}
                </section>
            </div>
        </section>
    );
};

export default GoodDetails;
