import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "src/orders/dto/create.order.dto";

export class UpdateOrderItemDto extends PartialType(CreateOrderDto) {}