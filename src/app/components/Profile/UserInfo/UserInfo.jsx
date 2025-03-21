import userInfoStyles from "./UserInfo.module.css";
import Image from "next/image";
import ava from "../../../../../public/assets/images/profile/Recovered_jpg_file(1526).jpg";

const UserInfo = () => {
    const [userData, setUserData] = useState(null);


    return (
        <div className={userInfoStyles.userInfoContainer}>
            <div className={userInfoStyles.avatarContainer}>
                <Image className={userInfoStyles.avatarka} src={ava} alt={"avatarka"}/>
            </div>

            <div className={userInfoStyles.userDetails}>
                <span className={userInfoStyles.userDetailsUsername}>USERNAME</span>
                <span className={userInfoStyles.userDetailsLocation}>Kyivska Oblast, Ukraine</span>
                <textarea className={userInfoStyles.userDetailsBio} defaultValue="Where does it come from?
Contrary to popular belief, Lorem Where does it come from?
Contrary to popular belief, Lorem Ipsum is There are
many variations of passages of Lorem Ipsum available,
but the majority have suffered alteration in some form, by
injected humour, or randomised words which don't look even slightly
believable. If you are going to use a passage of Lorem Ipsum, you need to be
sure there isn't anything embarrassing hidden in the middle of text.
All the Lorem Ipsum generators on the Internet tend to repeat predefined
 chunks as necessary, making this the first true generator on the Internet.
 It uses a dictionary of over 200 Latin words, combined with a handful of
 model sentence structures, to generate Lorem Ipsum which looks reasonable.
 The generated Lorem Ipsum is therefore always free from repetition,
 injected humour, or non-characteristic words etc.not simply random text.
 It has roots in a piece of classical Latin literature from 45 BC, making it
 over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
  College in Virginia, looked up one of the more obscure Latin words, consectetur,
   from a Lorem Ipsum passage, and going through the cites of the word in classical
   literature, discovered the Ipsum is There are many variations of passages of Lorem
   Ipsum available, but the majority have suffered alteration in some form,
   by injected humour, or randomised words which don't look even slightly
   believable. If you are going to use a passage of Lorem Ipsum, you need to
    be sure there isn't anything embarrassing hidden in the middle of text. All
     the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
      necessary, making this the first true generator on the Internet. It uses a
       хdictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable.
        The generated Lorem Ipsum is therefore always free from repetition,
        injected humour, or non-characteristic words etc.not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC, making
        it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, looked up one of the more obscure Latin words, consectetur,
         from a Lorem Ipsum passage, and going through the cites of the word in classical
          literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
           on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
            , comes from a line in section
                    1.10.32." disabled={true}>
                </textarea>
                <div className={userInfoStyles.userDetailsButtons}>
                    <button className={userInfoStyles.followButton}>Edit page</button>
                    <button className={userInfoStyles.followButton}>logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
