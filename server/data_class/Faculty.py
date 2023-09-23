import User


class Faculty(User):
    def __init__(self):
        self.designation = ""  # 100
        self.phone_no = 0000000000  # 11
        self.specialization = ""  # 100

    def validate_faculty(self):
        dataValidate = [self.designation, self.phone_no, self.specialization]
        size = [100, 11, 100]
        max_size = 0
        for data in dataValidate:
            data = super.validate_child_user(data, max_size[size])
            size += 1

    def add():
        return

    def update():
        return

    def delete():
        return

    def view():
        return
