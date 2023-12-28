import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const url = `${process.env.BASE_URL}/spaces/${process.env.SPACE_ID}/environments/master/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=blog`;
// console.log(url)

export default async function Home() {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <main>
      {/* map function to iterate over items Array */}
      {data.items.map((blog: any, index: number) => {

        // find function to find image url from Asset Array by item's asset id
        const image = data.includes.Asset.find((asset:any)=>
        asset.sys.id === blog.fields.image.sys.id
        )

        // find function to find author entry from  Entry Array by item's entry id
        const authorEntry = data.includes.Entry.find((entry:any)=>
        entry.sys.id === blog.fields.author.sys.id )
        // console.log(authorEntry.fields)

        
        // find function to find author image url from Asset Array  by entry's asset id
        const authorImage = data.includes.Asset.find((auth:any)=>
        auth.sys.id === authorEntry.fields.authorImage.sys.id
        )
        // console.log(authorImage.fields.file.url)
        
        // console.log(image.fields.file.url)


        return (
          <div key={index} className="px-24 mx-auto">
            <h1 className="text-3xl font-bold py-4 ">{blog.fields.title}</h1>
            <div className="py-4 ">
              {documentToReactComponents(blog.fields.body)}
            </div>
            <Image src={'https:'+image.fields.file.url} width={500} height={500} alt="blogimage" />
            <div className=" flex gap-2 mt-10 items-center">
              <Image src={'https:'+authorImage.fields.file.url} width={500} height={500} alt="author" className="h-16 w-16 rounded-full object-cover" />
            <h4>{authorEntry.fields.authorName}</h4>
              
            </div>
            
          </div>
        );
      })}
    </main>
  );
}
