from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text, func

from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(120), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), nullable=False, default="active")
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
