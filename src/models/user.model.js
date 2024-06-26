import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "brcypt"

const userSchema = new Schema (
    {
        username:
        {
            type: String,
            required: true,
            unique: true, 
            lowercase: true,
            trim: true,
            index: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true, 
            lowercase: true,
            trim: true,
        },
        fullname:
        {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: 
        {
            type: String, //Cloudinary URL
            required: true,
        },
        coverImage:
        {
            type: String,
        },
        watchHistory:
        [
            {
                type: Schema.type.ObjectID,
                ref: "Video"
            }
        ],
        password: 
        {
            type: String,
            required: [true, 'Password is required'],
        },
        refershToken:
        {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(this.isModified("password")) 
    {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    else next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(password){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(password){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User  = Mongoose.Model("User", userSchema)