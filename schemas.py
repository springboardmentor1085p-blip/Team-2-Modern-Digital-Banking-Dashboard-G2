from enum import Enum
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, date

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str = Field(..., min_length=10, max_length=15)

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    two_factor_enabled: bool

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    two_factor_enabled: bool

    class Config:
        from_attributes = True
        
class UpdateProfile(BaseModel):
    name: str
    phone: str

class ChangePassword(BaseModel):
    current_password: str
    new_password: str

class TwoFactorUpdate(BaseModel):
    enabled: bool

class TicketCreate(BaseModel):
    subject: str
    description: str
    category: str

class TicketResponse(BaseModel):
    id: int
    subject: str
    description: str
    category: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True   

class LoginUser(BaseModel):
    email: str
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class RewardCreate(BaseModel):
    program_name: str
    points_balance: int = 0


class RewardUpdate(BaseModel):
    points_balance: int


class RewardResponse(BaseModel):
    id: int
    program_name: str
    points_balance: int
    last_updated: datetime

    class Config:
        from_attributes = True
        
class RewardRedeem(BaseModel):
    reward_id: int
    account_id: int


