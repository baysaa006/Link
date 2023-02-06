import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import Head from "next/head";
import AddLink from "../../component/profile/links/addLink";
import { useQuery,  } from "react-query";

type Link = {
  title: string;
  url: string;
};

export default  function Home() {
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [links, setLinks] = useState<any>();
  const [products, setProducts]=useState<any>()
  const [create, setCreate] = useState<any>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<
    string | undefined
  >();
  const router = useRouter();
  const { creatorSlug } = router.query;

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };
  
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user);
      if (user.data.user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("title, url")
          .eq("user_id", userId);

        if (error) throw error;
        setLinks(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks();
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, profile_picture_url")
          .eq("username", creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data[0]["profile_picture_url"];
        const userId = data[0]["id"];
        setProfilePictureUrl(profilePictureUrl);
        setUserId(userId);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    if (creatorSlug) {
      getUser();
    }
  }, [creatorSlug]);

  
  const { data:product, error:productError,isLoading:productIsLoading } = useQuery(['products' ], async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
    if (productError) throw productError;
    else setProducts(data);

  });  console.log(products)

  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const uploadProfilePicture = async () => {
    try {
      if (images.length > 0) {
        const image = images[0];
        if (image.file && userId) {
          const { data, error } = await supabase.storage
            .from("public")
            .upload(`${userId}/${image.file.name}`, image.file, {
              upsert: true,
            });
          if (error) throw error;
          const resp = supabase.storage.from("public").getPublicUrl(data.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserReponse = await supabase
            .from("users")
            .update({ profile_picture_url: publicUrl })
            .eq("id", userId);
          if (updateUserReponse.error) throw error;
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  if (loading) {
  return <div className="flex items-center justify-center h-screen"> Loading...</div>;
}
  return (
    <>
      <Head>
        <title>{creatorSlug}</title>
      </Head>
      <div className="flex flex-col   mt-2 items-center  pb-4 justify-between w-full h-screen ">
        <div className="py-8 flex  gap-3 flex-col   h-fit w-full justify-between items-center mt-4">
          {isAuthenticated && (
            <button className="mt-8" onClick={logOut}>
              Log out
            </button>
          )}
          {profilePictureUrl && (
            <div className="relative items-center flex flex-col">
              <Image
                src={profilePictureUrl}
                alt="profile-picture"
                height={100}
                width={100}
                className="rounded-full  border-2 border-lime-300"
              />
              {isAuthenticated && (
                <>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                  >
                    {({
                      onImageUpload,
                      onImageRemoveAll,
                      isDragging,
                      dragProps,
                    }) => (
                      <div
                        className={` border-lime-300 absolute left-24 border-2 cursor-pointer   rounded-full px-2   ${
                          images.length > 0 ? " " : ""
                        }`}
                      >
                        {images.length === 0 ? (
                          <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <h1>+</h1>
                          </button>
                        ) : (
                          <button onClick={onImageRemoveAll}>-</button>
                        )}
                      </div>
                    )}
                  </ImageUploading>
                  {images.length > 0 && (
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-lime-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 mt-4"
                      onClick={uploadProfilePicture}
                    >
                      Upload
                    </button>
                  )}
                </>
              )}
            </div>
          )}
          <div className="flex">
            <h1
              className="cursor-pointer font-effect-fire-animation"
              onClick={(e) => {
                e.preventDefault();
                window.open(`${creatorSlug}`, "_blank");
              }}
            >{`@${creatorSlug}`}</h1>
            <i>🥳</i>
          </div>

          {links?.map((link: Link, index: number) => (
            <div
              className="shadow-md hover:translate-x-1 hover:translate-y-1 shadow-lime-200 w-96 bg-lime-300 mt-4 p-4 rounded-lg text-center font-bold cursor-pointer  text-gray-900"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                window.open(link.url, "_blank");
              }}
            >
              {link.title}
            </div>
          ))}
          {isAuthenticated && (
            <div>
              {create === 1 ? (
                <AddLink
                  title={title}
                  setTitle={setTitle}
                  url={url}
                  setUrl={setUrl}
                  links={links}
                  setLinks={setLinks}
                  userId={userId}
                  setClose={() => setCreate(0)}
                />
              ) : (
                <button
                  onClick={() => setCreate(1)}
                  className="rounded-2xl border-2 border-lime-300 p-2"
                >
                  Add new link
                </button>
              )}
              {create === 2 ? (
                <></>
              ) : (
                <button
                  onClick={() => setCreate(2)}
                  className="rounded-2xl border-2 border-lime-300 p-2"
                >
                  Add new Chat
                </button>
              )}

              <div>
                {images.length > 0 && (
                  <Image
                    src={images[0]["data_url"]}
                    height={100}
                    width={100}
                    alt="profile-picture"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
