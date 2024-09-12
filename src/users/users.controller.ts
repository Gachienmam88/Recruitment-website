import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TestsGuard } from './test.guard';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage("Tạo mới người dùng bởi admin !")
  async create(
    // @Body("email") email:string,
    // @Body("password") password:string,
    // @Body("name") name:string
    @Body() createUserDto:CreateUserDto , @User() user:IUser
  ) {
    // mean const myEmail = req.body.email
    const newUser= await this.usersService.create(createUserDto,user);
    return {
      _id:newUser._id,
      createdAt:newUser.createdAt
    }
  }

  
  @Get()
  @ResponseMessage("Lấy thông tin  danh sách người dùng theo trang")
  findAll(
    @Query("current") currentPage:string,
    @Query("pageSize") limit:string,
    @Query() qs:string
  ) {
    return this.usersService.findAll(+currentPage,+limit,qs);
  }
  
  @Public()
  @ResponseMessage("Lấy thông tin người dùng theo id ")
  @Get(':id')
  findOne(@Param('id') id: string) {
    //const id = req.params.id
    return this.usersService.findOne(id);
    //Convert id tu string sang number
  }
  

  @Patch(':id')
  @ResponseMessage("Cập nhật dữ liệu người dùng")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto , @User() user:IUser ) {
    return this.usersService.update(id, updateUserDto,user);
  }

  @ResponseMessage("Xóa người dùng")
  @Delete(':id')
  remove(@Param('id') id: string , @User() user:IUser) {
    return this.usersService.remove(id,user);
  }
}
