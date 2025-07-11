"""updates name to 255 characters

Revision ID: 8b4ec9d9c64e
Revises: d80f18eca0d0
Create Date: 2024-10-28 22:27:39.595292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b4ec9d9c64e'
down_revision = 'd80f18eca0d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('business', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=255),
               existing_nullable=True)
        batch_op.drop_index('ix_business_name')
        batch_op.create_index(batch_op.f('ix_business_name'), ['name'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('business', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_business_name'))
        batch_op.create_index('ix_business_name', ['name'], unique=False)
        batch_op.alter_column('name',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=50),
               existing_nullable=True)

    # ### end Alembic commands ###
