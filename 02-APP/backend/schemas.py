from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class ItemCreate(BaseModel):
    title: str = Field(..., max_length=120)
    description: Optional[str] = None
    status: Literal["active", "archived"] = "active"


class ItemUpdate(BaseModel):
    title: str = Field(..., max_length=120)
    description: Optional[str] = None
    status: Literal["active", "archived"] = "active"


class ItemOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class Stats(BaseModel):
    total: int
    active: int
    archived: int
