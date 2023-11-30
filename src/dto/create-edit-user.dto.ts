import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEditUserDto {

    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    password: string;


    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    address: string;


    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    bio: string;

    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    github_link: string;

    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    linkedin_link: string;

    @ApiProperty({type: 'string', required: true, nullable: false})
    @IsString()
    @IsNotEmpty()
    name: string;



}
